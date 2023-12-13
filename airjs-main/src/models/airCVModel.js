const tf = require('@tensorflow/tfjs');
const imageProcessing = require('../utils/imageProcessing')
const {AIRModel} = require("./airModel");

export class AIRCVModel extends AIRModel{
    constructor(id, name, version, description, config){
        super(id, name, version, description, config);
    }

    async deserialize() {
        await super.deserialize()
    }

    async run(dataPoint, drawPredictions = true) {
        if(dataPoint.type == 'cv'){
            dataPoint.rawData = await imageProcessing.loadFromURL(dataPoint.src)
            if(dataPoint.rawData){
                if(this.name == 'mobilenetDefault') {
                    // check if mobileNet disposes of tensors
                    dataPoint.predictions = await this.model.classify(dataPoint.rawData);
                }
                else{
                    dataPoint.tensorData = tf.browser.fromPixels(dataPoint.rawData).toFloat();
                    await super.preprocess(dataPoint);
                    const preds = tf.tidy(() => {
                        const batchInputShape = [this.model.layers[0].batchInputShape]
                        dataPoint.tensorData = dataPoint.tensorData.reshape([1, batchInputShape[0][1], batchInputShape[0][2], batchInputShape[0][3]]);
                        return this.model.predict(dataPoint.tensorData);
                    })
                    dataPoint.predictions = await super.postprocess(preds);
                    dataPoint.predsOnBase64Image = imageProcessing.drawClassification(dataPoint.rawData, dataPoint.predictions)
                }
                return dataPoint
            }
        }
    }
}


// async function test(){
//
//     const image = tf.randomNormal([200, 200, 1]);
//     const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pas45en-bien. Que me cuen22tan. punto. punto1.";
//     // console.log(modelConfig);
//     const m = new AIRCVModel("modelo1", "botate", "modelo 2", "botate", modelConfig);
//     const dataPoint = {data: string, type: "nlp"};
//     const data = await m.run(dataPoint);
//     console.log(data)
//
// }
//
// test();