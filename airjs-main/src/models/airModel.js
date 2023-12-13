const tf = require('@tensorflow/tfjs');
const imageProcessing = require('../utils/imageProcessing')
const preprocessingFactory = require("../models/preprocessing/preprocessingFactory");
const postprocessingFactory = require("../models/postprocessing/postprocessingFactory");
const ResponseError = require('../utils/errors').ResponseError

/**
 * Class representing an AIRModel.
 * @class AIRModel
 * @classdesc The AIRModel class is the base model class which will be extended by several other classes for task specific implementations.
 * */
export class AIRModel {

    /**
     * AIRModel object constructor
     * @constructor
     * @param {Number} id - Valid model identifier.
     * @param {String} name - Model name.
     * @param {String} version - Current model version.
     * @param {String} description - Sentence describing the model.
     * @param {JSON} config - JSON formatted model configuration file.
     * @return {AIRModel} AIRModel object.
     */
    constructor(id, name, version, description, config) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.description = description;
        this.config = config;
        this.model;
    }

    typeFromConfig = function() {
        let type = '';
        switch(this.config.modelConfig.preprocessing[0].className){
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
     * Read model specified by ID from IndexDB, deserialize, and load it to AIRModel object in model attribute.
     */
    async deserialize(){
        // todo possibly move mann layer registration to a place where it will only happen once
        // this.registerMANNLayers();
        this.model = await tf.loadLayersModel('indexeddb://' + this.id)
    }

    /**
     * Reads the list of MANN layers specified in the model config object, instantiates them, and registers them.
     * @todo Implement function
     */
    async registerMANNLayers() {
        // todo find list of MANN layers in config. then instantiate and register each layer
        throw new ResponseError('not implemented', undefined, 500);
    }

    /**
     * Applies the list of pre-processing steps specified in the model config object.
     * @todo Implement function
     */
    async preprocess(dataPoint) {
        const preprocessingSteps = this.config.modelConfig.preprocessing[0].steps;
        let stepObject;
        for(let step of preprocessingSteps){
            stepObject = preprocessingFactory.createPreprocessingStep(step.className, step.params, dataPoint);
            dataPoint.tensorData = await stepObject.apply();
        }
        return dataPoint;
    }

    /**
     * Applies the list of post-processing steps specified in the model config object.
     * @todo Implement function
     */
    async postprocess(logits) {
        const postprocessingStep = this.config.modelConfig.postprocessing[0];
        let stepObject = await postprocessingFactory.createPostprocessingStep(postprocessingStep.className, postprocessingStep.params, logits);
        return await stepObject.apply();
    }

    /**
     * Runs the currently loaded AIRModel on provided input and returns the results object.
     * @param {} dataPoint -
     * @param {JSON} topicToKeyword - Topic to keyword mappings object.
     * @param {Boolean} drawPredictions - **defaults:** true
     * @return {multiClassClassification} an object containing
     */
    run(dataPoint, topicToKeyword, drawPredictions = true) {
        throw new ResponseError('not implemented', undefined, 500);
    }

// async function test(){
//
//     const image = tf.randomNormal([200, 200, 1]);
//     const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pas45en-bien. Que me cuen22tan. punto. punto1.";
//     // console.log(modelConfig);
//     const m = new AIRModel("modelo1", "botate", "modelo 2", "botate", modelConfig);
//     const dataPoint = {data: string, type: "nlp"};
//     const data = await m.run(dataPoint);
//     console.log(data)
//
// }
//
// test();

}

// module.exports.AIRModel = AIRModel;