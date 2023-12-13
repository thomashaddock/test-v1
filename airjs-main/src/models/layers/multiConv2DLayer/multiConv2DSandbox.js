const {MultiConv2D} = require("./multiConv2D");
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const {tensorEquality} = require("../../../utils/tensors")
const assert = require('assert');

async function multiConv2DLayerTest(){
    const t1 = tf.ones([5,5,3]);
    const t2 = tf.ones([5,5,3]);
    const convLayer = new MultiConv2D({
        filters: 16,
        kernelSize: 3,
        padding: "same",
        strides: 1,
        useBias: true,
        activation: "relu",
        kernelInitializer: tf.initializers.randomNormal({mean: 0, stddev: 1, seed: null}),
        biasInitializer: tf.initializers.ones(),
        testing : true
    })

    const r = tf.tensor([[[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
        [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]],

        [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]],

        [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]],

        [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]],

        [[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]]]
    )
    const output = convLayer.apply([t1,t2]);
    assert(await tensorEquality(output[0], r) === true);
    console.log("MultiConv2D Layer Test Passed");
    return



}
async function multiConv2DModelTest(){

    const input1 = tf.input({shape: [5,5,3]});
    const input2 = tf.input({shape: [5,5,3]});
    const convLayer = new MultiConv2D({
        filters: 16,
        kernelSize: 3,
        padding: "same",
        strides: 1,
        useBias: true,
        activation: "sigmoid",
        kernelInitializer: tf.initializers.randomNormal({mean: 1, stddev: 1, seed: 0}),
        biasInitializer: tf.initializers.ones(),
        testing : true
    })

    const output = convLayer.apply([input1, input2]);
    const model = tf.model({
        inputs: [input1, input2],
        outputs: output});
    const t1 = tf.ones([1,5,5,3]);
    const t2 = tf.ones([1,5,5,3]);

    const result = model.predict([t1, t2]);
    const r = tf.tensor([[[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
        [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
        [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]],

        [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]],

        [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]],

        [[18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18]],

        [[12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18],
            [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12]]]
    )
    assert((await tensorEquality(result[0], r)) === true);
    console.log("MultiConv2d Model Test")
    return
}

async function multiConv2DLoadModelTest(){
    //Loading model
    const toBeLoaded = tfn.io.fileSystem('./multiConv2DLayer/model.json');
    const toBeSaved = tfn.io.fileSystem('./multiConv2DLayer/modelsave.json');
    const model = await tf.loadLayersModel(toBeLoaded);

    //Saving model
    await model.save(toBeSaved)
    const path = tfn.io.fileSystem('./multiConv2DLayer/modelsave.json/model.json');
    const model1 = await tf.loadLayersModel(path);

    //Run predictions
    const t1 = tf.ones([1,5,5,3]);
    const t2 = tf.ones([1,5,5,3]);

    const result = model1.predict([t1, t2]);

    console.log("Load MultiConv2d Model Test Passed");
    return
}

// multiConvLayerTest();
// multiConvModelTest();
// multiConvLoadModelTest()

module.exports = {multiConv2DLayerTest, multiConv2DModelTest, multiConv2DLoadModelTest};
