const airjs = require("../../src/air");
const {generateDBName} = require("../utils/dbNameGenerator");
const {data} = require("@tensorflow/tfjs");
const {qr} = require("@tensorflow/tfjs-core/dist/ops/linalg/qr");
describe('Prediction Manager Tests', () => {
    let dbManager;
    let modelManager;
    let predictionManager;

    beforeEach(async () => {
        dbManager = new airjs.AIRDBManager(generateDBName(5));
        await dbManager.init();
        modelManager = new airjs.AIRModelManager(dbManager.db)
        predictionManager = new airjs.AIRPredictionManager(dbManager.db);
    })

    afterEach(async () => {
        await dbManager.db.close();
        await dbManager.db.delete();
    })

    it("should create a prediction object in the database", async () =>{
        let dataPoint = {rawData: "string"};
        let models = await (await modelManager.listModels()).json();
        let modelId = models[0].id;
        let pred = {prediction: 1, keywords: ["salu3"], documents: ["jeje"]};
        await predictionManager.createPrediction(modelId, pred, dataPoint.rawData);
        let res = await (await predictionManager.listPredictions()).json()
        expect(res.length).toBe(1);

    });

    it("should list created predictions", async () => {
        let dataPoint = {rawData: "string"};
        let models = await (await modelManager.listModels()).json();
        let modelId = models[0].id;
        let pred = {prediction: 1, keywords: ["salu3"], documents: ["jeje"]};
        await predictionManager.createPrediction(modelId, pred,dataPoint.rawData );
        let res = await (await predictionManager.listPredictions()).json();
        expect(res.length).toBe(1);
        await predictionManager.createPrediction(modelId, pred, dataPoint.rawData);
        res = await (await predictionManager.listPredictions()).json();
        expect(res.length).toBe(2);

    });

    //Update this test
    it("should list predictions with document and keyword filters", async () => {
        let dataPoint = {rawData: "string"};
        let models = await (await modelManager.listModels()).json();
        let modelId = models[0].id;
        let pred1 = {prediction: 1, keywords: ["salu3"], documents: ["jeje"]};
        let pred2 = {prediction: 0, keywords: ["salu3"], documents: ["jeje"]};
        let pred3 =  {prediction: 0, keywords: ["salu2"], documents: ["jeje"]};
        await predictionManager.createPrediction(modelId, pred1, dataPoint.rawData);
        await predictionManager.createPrediction(modelId, pred2, dataPoint.rawData);
        await predictionManager.createPrediction(modelId, pred3, dataPoint.rawData);
        let res = await (await predictionManager.listPredictions()).json();
        expect(res.length).toBe(3);
        res = await (await predictionManager.listPredictions()).json();
        expect(res.length).toBe(3);
        res = await (await predictionManager.listPredictions()).json();
        expect(res.length).toBe(3);
        res = await (await predictionManager.listPredictions()).json();
        expect(res.length).toBe(3);
    });

    it("should read a prediction", async () => {
        let dataPoint = {rawData: "string"};
        let models = await (await modelManager.listModels()).json();
        let modelId = models[0].id;
        let pred1 = {prediction: 1, keywords: ["salu3"], documents: ["jeje"]};
        let id = await (await predictionManager.createPrediction(modelId, pred1, dataPoint.rawData)).json();
        let res = await (await predictionManager.readPrediction(id)).json();
    });

    it("should update prediction in database", async () => {
        let dataPoint = {rawData: "string"};
        let models = await (await modelManager.listModels()).json();
        let modelId = models[0].id;
        let pred1 = {prediction: 1, keywords: ["salu3"], documents: ["jeje"]};
        let predId = await (await predictionManager.createPrediction(modelId, pred1, dataPoint.rawData)).json();
        let updatedPred = {prediction: 0, keywords: ["salu222"], documents: ["jajaja"]};
        let res = await (await predictionManager.updatePrediction(predId, updatedPred)).json();
        res = await (await predictionManager.readPrediction(predId.id)).json();
        expect(res.id).toBe(predId.id);
    });

    it("should delete prediction from database", async () => {
        let dataPoint = {rawData: "string"};
        let models = await (await modelManager.listModels()).json();
        let modelId = models[0].id;
        let pred1 = {prediction: 1, keywords: ["salu3"], documents: ["jeje"]};
        let pred = await (await predictionManager.createPrediction(modelId, pred1, dataPoint.rawData)).json();
        let res = await (await predictionManager.deletePrediction(pred.id)).json();
        expect(res.id).toBe(pred.id);

    });

});