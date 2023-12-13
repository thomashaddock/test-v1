const tf = require('@tensorflow/tfjs');
const {AIRModel} = require("./airModel");

export class AIRNLPModel extends AIRModel{
    constructor(id, name, version, description, config){
        super(id, name, version, description, config);
    }

    async deserialize() {
        await super.deserialize()
    }

    async run(dataPoint, drawPredictions = true) {
        if(dataPoint.type == 'text' && dataPoint.rawData){
            dataPoint.tensorData = dataPoint.rawData.textContent; // remove when test preprocessors operate on rawData instead of tensorData
            await super.preprocess(dataPoint); // check if this could this cause a memory leaks
            const preds = tf.tidy(() => {
                dataPoint.tensorData = tf.tensor([dataPoint.tensorData,])
                return this.model.predict(dataPoint.tensorData);
            })
            dataPoint.predictions = await super.postprocess(preds);
            return dataPoint
        }
    }
}