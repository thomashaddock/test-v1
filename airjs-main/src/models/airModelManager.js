import {actions} from "../utils/constants";
require('babel-polyfill');
const tf = require('@tensorflow/tfjs');
const AIRModel = require('./airModel').AIRModel;
const modelFactory = require('./modelFactory')
const inputValidation = require('../utils/inputValidation');
const ResponseError = require('../utils/errors').ResponseError
const {ERROR_MESSAGES, HTTP_STATUS_CODES} = require('../utils/constants');
const modelConfigSchema = require('./schemas/modelConfig');
const {topicToKeyword} = require('./topicToKeyWordAndDocuments');
const {logUsage} = require("../utils/usageMetrics");
const zip = require('@zip.js/zip.js');
const {airPredictionManager}= require("../predictions/airPredictionManager")
zip.configure({
    useWebWorkers: false
});

/**
 * Class representing an AIRModelManager.
 * @class AIRModelManager
 * @classdesc The AIRModelManager class is in charge or coordinating interactions between the AIRDBManager and the AIRModel.
 * @memberOf module:AIRModelSDK
 * */
export class AIRModelManager {
    /**
     * AIRModelManager object constructor.
     * @constructor
     * @param {Object} db - Connection object to model repository db.
     * @return {AIRModelManager} AirModelManager object.
     */
    constructor(db){
        if(!db) throw ERROR_MESSAGES.DB_OBJECT_REQUIRED;
        /** @member {Object} AIRModelManager.db - DB connection object. */
        this.db = db;
        /** @member {AIRModel} AIRModelManager.selectedModel */
        this.selectedModel = undefined;
        /** @member {JSON} AIRModelManager.topicToKeyword */
        this.topicToKeyword = topicToKeyword;
        /** @member {Object} AIRModelManager.predictions */
        this.predictions = {};  //Cambiar por el prediction manager
        /** @member {Array} AIRModelManager.currentKeywords */
        this.currentKeywords = [];

        this.predictionManager = new airPredictionManager(db);
        // this.currentPreds = {};

        // todo determine model data type based on contents of config file
    }

    modelTypeFromConfig = function(config) {
        let type = '';
        switch(config.modelConfig.preprocessing[0].className){
            case 'ImagePreprocessor':
                type = 'cv'
                break;
            case 'TextPreprocessor':
                type = 'text'
                break;
            case 'TabularProcessor':
                type = 'tabular'
                break;
        }
        return type;
    }

    /**
     * Move array from
     * @param {Array} arr - Valid model identifier.
     * @param {Number} fromIndex - Position of item to be moved.
     * @param {Number} toIndex - Position to mode the item to.
     * @return {Array} Array with the item moved to the position specified.
     */
    arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        return arr;
    }

    /**
     * Create a new model and saves it in the DB specified in the AIRModelManager Class.
     * @param {String} name - Model name.
     * @param {String} version - Current model version.
     * @param {String} description - Sentence describing the model.
     * @param {String} modelFile - Zipped folder containing model files.
     * @param {String} url - URL indicating the location to fetch the model.
     * @param {JSON} headers - Http request headers required to fetch the model.
     * @todo send whole model to schema validation
     */
    async createModel(modelFile = undefined, url = '', headers = {}){
        let model = {};
        let config;
        let modelFiles = [];
        const reader = new zip.ZipReader(new zip.BlobReader(modelFile));
        const entries = await reader.getEntries();
        let modelWeights = [];
        let modelJsonFile;
        //todo add error management to this for loop
        for(var entry of entries) {
            if(entry.filename.includes('config.json') ) {
                let configText = await entry.getData(new zip.TextWriter());
                config = JSON.parse(configText);
                const validationResult = inputValidation.validateSchema(config, modelConfigSchema)
                if(validationResult.isValid){
                    model['config'] = config;
                }
                else throw new ResponseError('bad input', validationResult.errors, 400)
            } else if (entry.filename.includes('.bin')) {
                let weightData = await entry.getData(new zip.BlobWriter());
                let weightFile = new File([weightData], entry.filename);
                modelFiles.push(weightFile);
                modelWeights.push(weightFile);

            } else if(entry.filename.includes('model.json')) {
                let modelJson = await entry.getData(new zip.TextWriter());
                modelJsonFile = new File([modelJson], entry.filename);
                modelFiles.push(modelJsonFile);
            }
        }
        let modelJsonFileIndex = modelFiles.map(file => file.name).indexOf('model.json');
        modelFiles = this.arraymove(modelFiles, modelJsonFileIndex, 0);
        // todo send whole model to schema validation
        model['createdAt'] = Date.now()
        model['modifiedAt'] = Date.now()
        model['type'] = this.modelTypeFromConfig(model['config'])
        let id;

        await logUsage(actions.CREATE, {model}, undefined, this.db);

        return this.db.transaction("rw", this.db.models, this.db.modelFiles , async () => {

            id = await this.db.models.put(model);
            let r = await this.db.modelFiles.put({id: id, weightFiles: modelWeights, modelJson: modelJsonFile});

        }).then(async () => {
            try{
                if(modelFiles.length > 0){
                    return await this.saveModelFiles(id, modelFiles = modelFiles)
                }
                else{
                    return await this.saveModelFiles(id, url = url, headers = headers)
                }

            }catch(e){
                await this.deleteModel(id)
                throw e
            }

        }).catch(() => {
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {id}, HTTP_STATUS_CODES.STATUS_500);
        });

        // throw new ResponseError('bad input', validationResult.errors, 400)
    }


    /**
     * Read model.
     * @param {Number} id - Valid model identifier.
     * @return {AIRModel} Instantiated AIRModel from models in DB.
     */
    async readModel(id){
        if(id){
            await logUsage(actions.READ, {id}, undefined, this.db);
            const model = await this.db.models.get(id);
            if(model){
                // instantiate AIRModel
                return new Response(JSON.stringify(model), { "status": HTTP_STATUS_CODES.STATUS_200});
            }
            else{
                throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {id}, HTTP_STATUS_CODES.STATUS_404);
            }
        }
        throw new ResponseError(ERROR_MESSAGES.BAD_INPUT, {id}, HTTP_STATUS_CODES.STATUS_400);
    }

    /**
     * Update the specified model in the DB following the specifications from the model configuration file, and instantiates it.
     * @param {Number} id - Valid model identifier.
     * @param {JSON} config - JSON formatted model configuration file.
     * @return {AIRModel} Instantiated AIRModel from updated model in DB.
     */
    async updateModel(id, config){
        const validationResult = inputValidation.validateSchema(config, modelConfigSchema)
        if(id && validationResult.isValid){
            await logUsage(actions.UPDATE, {id, config}, undefined, this.db);
            await this.db.models.update(id, {'modifiedAt': Date.now(), config});
            return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200})
        }
        throw new ResponseError(ERROR_MESSAGES.BAD_INPUT, validationResult.errors, HTTP_STATUS_CODES.STATUS_400)
    }

    /**
     * Delete the specified model from DB.
     * @param {Number} id - Valid model identifier.
     * @return {AIRModel} Instantiated AIRModel from model in DB.
     * @todo test when id does not exist
     */
    async deleteModel(id){
        if(id){
            await logUsage(actions.DELETE, {id}, undefined, this.db);
            try {
                const model = await tf.loadLayersModel('indexeddb://' + id);
            } catch(e){
                throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {id}, HTTP_STATUS_CODES.STATUS_404);
            }

            try {
                this.deleteModelFiles(id);
            }catch(e){
                throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {id}, HTTP_STATUS_CODES.STATUS_500);
            }
            try {
                await this.db.models.where('id').equals(id).delete();
                return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200})
            } catch(e){
                model.save("indexddb://" + id);
                throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {id}, HTTP_STATUS_CODES.STATUS_400);
            }
        }
        throw new ResponseError(ERROR_MESSAGES.BAD_INPUT, {id}, HTTP_STATUS_CODES.STATUS_400)
    }

    /**
     * List the models available on the DB.
     * @param {String} name - Model name.
     * @param {String} version - Current model version.
     * @param {String} description - Sentence describing the model.
     * @return {Array} List of available AIRModels in DB.
     */
    async listModels(name = undefined, version = undefined, description = undefined, selected = undefined){
        await logUsage(actions.LIST, {name, version, description}, undefined, this.db);
        const models = await this.db.models.toArray();
        if(models.length > 0){
            return new Response(JSON.stringify(models), { "status": HTTP_STATUS_CODES.STATUS_200});
        }
        else{
            throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {models}, HTTP_STATUS_CODES.STATUS_404)
        }
    }

    /**
     * Save a model in the browser's IndexedDB.
     * @param {Number} id - Valid model identifier.
     * @param {String} [modelFile=[]] - Zipped folder containing model files.
     * @param {String} [url=''] - URL indicating the location to fetch the model. *Must be specified if no modelFile is provided.
     * @param {JSON} [headers={}] - Http request headers required to fetch the model.
     * @todo send whole model to schema validation
     */
    async saveModelFiles(id, modelFiles = [], url = '', headers = {}){
        // user can specify files or url, but not both
        if(modelFiles.length > 0 && url.length > 0) throw new ResponseError('bad input', 'can only specify files or url, but not both', 400)
        if(modelFiles.length == 0 && url.length == 0) throw new ResponseError('bad input', 'no files or url specified', 400)
        let model;
        try{
            if(modelFiles.length > 0){
                const filesHandler = tf.io.browserFiles(modelFiles);
                model = await tf.loadLayersModel(filesHandler)
            }
            else{
                // does not yet send headers to support authenticated get requests for loading models from remote urls
                model = await tf.loadLayersModel(url)
            }
            // save loaded model to indexed db
            model.save('indexeddb://' + id);
            return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200});
        }catch(e){
            // tfjs or indexed db failed while loading or saving model
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {e, id}, HTTP_STATUS_CODES.STATUS_500)
        }
    }

    /**
     * Delete a model from the browser's IndexedDB.
     * @param {Number} id - Valid model identifier.
     * @todo use tfjs api to delete model from indexedDB found in path
     */
    async deleteModelFiles(id){
        try{
            tf.io.removeModel('indexeddb://' + id);
            return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200})
        }catch(e){
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {e, id}, HTTP_STATUS_CODES.STATUS_500);
        }

        // throw new ResponseError('not implemented', undefined, 500)
    }

    /**
     * Load a model from the DB specified in AIRModelManager object.
     * @param {Number} id - Valid model identifier.
     * @return {AIRModel} Specified AIRModel will be loaded and instantiated into the AIRModelManager.selectedModel attribute.
     */
    async loadModel(id) {
        if(id){
            await logUsage(actions.LOAD, {id}, undefined, this.db);
            let model = await (await this.readModel(id)).json()
            if(model){
                // if(this.selectedModel) this.offLoadModel(this.selectedModel.id)
                // use factory to instantiate and deserialize AIRModel
                // this.selectedModel = new AIRModel(model.id, model.name, model.version, model.description, model.config, model.type);

                // create AIRModel object
                this.selectedModel = modelFactory.createAIRModel(model)
                // load model weights
                await this.selectedModel.deserialize();
                return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200})
            }
            throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {models}, HTTP_STATUS_CODES.STATUS_404)
        }
        throw new ResponseError(ERROR_MESSAGES.BAD_INPUT, {id}, HTTP_STATUS_CODES.STATUS_400)
    }

    /**
     * Purge a model from the AIRModelManager.selectedModel attribute.
     * @param {Number} id - Valid model identifier.
     */
    async offLoadModel() {
        const id = this.selectedModel.id;
        tf.dispose(this.selectedModel.model);
        this.selectedModel = undefined;
        return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200});
    }

    /**
     * Use the model from the AIRModelManager.selectedModel attribute.
     * @param {Number} modelId - Valid model identifier.
     * @param {Object} harvestedDataPoint - harvested data to be processed by the model.
     * @return {Object} A set of results from running on the harvested data.
     */
    async useModel(modelId, harvestedDataPoint){
        if(this.selectedModel) {
            //Logs usage to usage metrics table in db
            await logUsage(actions.USE, {modelId, harvestedDataPoint}, undefined, this.db);
            //Generates a prediction
            const result = await this.selectedModel.run(harvestedDataPoint, this.topicToKeyword);
            //Stores prediction in database
            await this.predictionManager.createPrediction(this.selectedModel.modelId, result,harvestedDataPoint.rawData);
            if(result){
                this.currentKeywords = result.keywords ?? false; // not being used - dom text decorator "caches" keywords
                this.predictions[harvestedDataPoint.id] = result
            }
            return result;
        }
        throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, undefined, HTTP_STATUS_CODES.STATUS_404)
    }

    /**
     * Get the results generated by the model from the AIRModelManager.predictions attribute.
     * @param {String} url - URL indicating the origin of the harvested data where the predictions where obtained from.
     * @return {Object} A set of stored results from running on the harvested data.
     */
    async getPredictions(url){
        if(url in this.predictions){
            return this.predictions[url];
        }
        else {
            throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, undefined, HTTP_STATUS_CODES.STATUS_404)
        }
    }
    /**
     * Export AIR Model that is located in the datebase
     * @param {Number} id - Id of model to be exported
     * @return {Blob} A blob of the compressed AIR Model
     */
    async export(id){

        try {
            let modelMetadata;
            let modelFiles;
            //Read model config from db
            let res = await this.readModel(id);
            modelMetadata = await res.json();
            //Read model files
            modelFiles = await this.db.modelFiles.get(id);
            const modelName = modelMetadata.config.modelConfig.name;
            const config = modelMetadata.config;
            const weights = modelFiles.weightFiles;
            const modelJson = modelFiles.modelJson;

            //Zip Writer
            const zipWriter = new zip.ZipWriter(new zip.BlobWriter(modelName + ".air"));

            //Zip config and model.json
            await zipWriter.add("model.json", new zip.BlobReader(modelJson));
            await zipWriter.add("config.json", new zip.TextReader(JSON.stringify(config)));

            //Zip bin files
            for(var entry of weights){
                await zipWriter.add(entry.name, new zip.BlobReader(entry));
            }
            return await zipWriter.close();
        } catch(e){
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {id}, HTTP_STATUS_CODES.STATUS_500)
        }

    }
}

// module.exports.AIRModelManager = AIRModelManager;
