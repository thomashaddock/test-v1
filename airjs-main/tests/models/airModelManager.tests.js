
// const airjs = require('airjs');
const {ResponseError} = require("../../src/utils/errors");
// const chrome = require('sinon-chrome');
const airjs = require('../../src/air');
const {generateDBName} = require('../utils/dbNameGenerator');
const tf = require('@tensorflow/tfjs');
const zip = require("@zip.js/zip.js");
describe('Model Manager Tests', () =>{
    let dbManager;
    let modelManager;

    beforeEach(async () => {
        dbManager = new airjs.AIRDBManager(generateDBName(5));
        await dbManager.init();
        modelManager = new airjs.AIRModelManager(dbManager.db)
    })

    afterEach(async () => {
        await dbManager.db.close();
        await dbManager.db.delete();
    })

    it("should throw error when reading model that does not exist", async () => {

        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let res = await (await modelManager.createModel(
            modelFile = mFile)).json();
        res = await (await modelManager.readModel(res.id)).json()
        let createdId = res.id;
        res = await modelManager.deleteModel(createdId);
        try{
            res = await modelManager.readModel(createdId)
        }
        catch(e){
            expect(e).toBeInstanceOf(ResponseError);
        }

    })

    it("should create new model", async () => {
        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let n = '';
        let ver = '';
        let desc = '';
        let res = await (await modelManager.listModels()).json();
        expect(res.length).toBe(1);
        res = await modelManager.createModel(modelFile = mFile);
        res = await (await modelManager.listModels()).json();
        expect(res.length).toBe(2);
    })

    it("should list models in the db", async () => {
        let res = await (await modelManager.listModels()).json()
        expect(res.length).toBe(1);

    })

    it("should purge all tensors from memory", async () => {
        // let res2 = await fetch('/base/tests/utils/static/cifar1.air.air')
        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let res = await (await modelManager.createModel(
            modelFile = mFile)).json();
        await modelManager.loadModel(res.id);
        let createdId = res.id;
        // let createdId = 2;
        res = await modelManager.offLoadModel();
        const result = await res.json();
        expect(result.id).toBe(createdId);
    })

    it("should delete model files in db", async () => {
        const modelList = await tf.io.listModels();
        if(Object.keys(modelList).length === 0){
            expect(Object.keys(modelList).length).toBe(1);
        }
        await modelManager.deleteModelFiles(1);
        const modelList2 = await tf.io.listModels();
        expect(Object.keys(modelList2).length).toBe(Object.keys(modelList).length - 1);
    })

    it("should delete model", async () => {
        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let res = await (await modelManager.createModel(
            modelFile = mFile)).json();
        let createdId = res.id;
        res = await modelManager.deleteModel(createdId);
        const result = await res.json();
        // const a = res;
        expect(result.id).toBe(createdId);

        try {
            res = await modelManager.readModel(createdId);
        } catch(e){
            expect(e).toBeInstanceOf(ResponseError)
        }


    });

    it("createModel should throw error when sending an incorrect file", async () => {
        let res2 = await fetch('/base/tests/utils/static/noFile.txt')
        let bl = await res2.blob();
        let mFile = new File([bl], 'noFile.zip');
        try {
            let res = await modelManager.createModel(
                modelFile = mFile)
        } catch (e) {
            expect(e).toBeInstanceOf(Error)
        }

    })

    it("createModel should throw error when sending an incorrect file no model", async () => {
        let res2 = await fetch('/base/tests/utils/static/sentimentAnalysisNoModel.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'sa.air');
        try {
            let res = await modelManager.createModel(
                modelFile = mFile)
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError)
        }

    })

    it("createModel should throw error when sending an incorrect file no config", async () => {
        let res2 = await fetch('/base/tests/utils/static/sentimentAnalysisNoConfig.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'sa.air');
        try {
            let res = await modelManager.createModel(
                modelFile = mFile)
        } catch (e) {
            expect(e).toBeInstanceOf(TypeError)
        }

    })

    it("readModel should throw error when sending a non-existent id", async () => {
        try {
            let res = await modelManager.readModel(4)
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError)
        }

    })

    it("readModel should throw error when not sending an id", async () => {
        try {
            let res = await modelManager.readModel();
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError)
        }

    })

    it("readModel should return stored model", async () => {

        let res = await (await modelManager.readModel(1)).json();
        expect(res).not.toBe(undefined);
    })

    it("updateModel should update stored model", async () => {
        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let n = '';
        let n2 = 'Name 2';
        let ver = '';
        let ver2 = 'Ver 2';
        let desc = '';
        let desc2 = 'Desc 2';
        let res = await (await modelManager.createModel(modelFile = mFile)).json();
        res = await (await modelManager.readModel(res.id)).json();
        expect(res.config.modelConfig.name).toBe(n)
        expect(res.config.modelConfig.version).toBe(ver)
        expect(res.config.modelConfig.description).toBe(desc)
        res.config.modelConfig.name = n2;
        res.config.modelConfig.version = ver2;
        res.config.modelConfig.description = desc2;
        res = await (await modelManager.updateModel(res.id, res.config)).json();
        res = await (await modelManager.readModel(res.id)).json();
        expect(res.config.modelConfig.name).toBe(n2)
        expect(res.config.modelConfig.version).toBe(ver2)
        expect(res.config.modelConfig.description).toBe(desc2)
    })

    it("updateModel should return error when id is not sent", async () => {
        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let n = '';
        let n2 = 'Name 2';
        let ver = '';
        let ver2 = 'Ver 2';
        let desc = '';
        let desc2 = 'Desc 2';
        let res = await (await modelManager.createModel(modelFile = mFile)).json();
        res = await (await modelManager.readModel(res.id)).json();
        res.config.modelConfig.name = n2;
        res.config.modelConfig.version = ver2;
        res.config.modelConfig.description = desc2;
        try {
            res = await (await modelManager.updateModel(undefined, res.config)).json();
        } catch (e) {
            expect(e).toBeInstanceOf(ResponseError);
        }


    })

    it("should return exported model", async () => {
        let res2 = await fetch('/base/tests/utils/static/cifar1.air')
        let bl = await res2.blob();
        let mFile = new File([bl], 'cifar1.air');
        let res = await modelManager.createModel(modelFile = mFile);
        res = await res.json();
        let id = res.id;
        //Export created model
        let zipped = await modelManager.export(id);
        //Create file object of exported blob
        const file = new File([zipped], "test.air");
        //Create new model with exported files
        res = await modelManager.createModel(modelFile = file);
        res = await res.json();
        id = res.id;
        //Load create model
        await modelManager.loadModel(id);
        await modelManager.selectedModel.deserialize();
        //Run prediction on created model
        const prediction = await modelManager.selectedModel.model.predict(tf.ones([1,32,32,3]));
        let r = prediction.shape;
        expect(r).toEqual([1,10]);
    })

});
