const {SelectorLayer} = require("./selectorLayer");
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const assert = require('assert');
const {tensorEquality} = require("../../../utils/tensors")


async function selectorLayerTest(){
    const t1 = tf.tensor([1,2,3,4]);
    const t3 = tf.tensor([2,1,3,4]);
    const t2 = tf.tensor([4,3,2,1]);
    const selectLayer = new SelectorLayer({selIndex: 0});

    const res = selectLayer.apply([t1, t2, t3]);
    assert (await tensorEquality(res, t1) == true);


    selectLayer.selIndex = 1;
    const res1 = selectLayer.apply([t1,t2, t3]);
    assert (await tensorEquality(res1, t2));


    selectLayer.selIndex = 2;
    const res2 = selectLayer.apply([t1,t2, t3]);
    assert(await tensorEquality(res2, t3) == true);
    console.log("Selector Layer Test Passed");
}

async function selectorModelTest(){
    const input1 = tf.input({shape: [10]});
    const input2 = tf.input({shape: [10]});
    const output = new SelectorLayer({selIndex: 0}).apply([input1, input2]);

    const model = tf.model({
        inputs: [input1, input2],
        outputs : output
    });

    const t1 = tf.tensor([1,2,3,4,5,6,7,8,9,10]).reshape([1,10]);
    const t2 = tf.tensor([10,9,8,7,6,5,4,3,2,1]).reshape([1,10]);

    const r1 = model.predict([t1, t2]);
    assert (await tensorEquality(t1, r1) == true);
    model.layers[2].selIndex = 1;
    const r2 = model.predict([t1, t2]);
    assert (await tensorEquality(t2, r2) == true);

    console.log("Selector Model Test Passed");
}

async function selectorLoadModelTest(){
    const toBeLoaded = tfn.io.fileSystem('./selectorLayer/model.json');
    const toBeSaved = tfn.io.fileSystem('./selectorLayer/modelSave');
    //Loading model
    const model = await tf.loadLayersModel(toBeLoaded);
    //Saving model
    await model.save(toBeSaved)
    const path = tfn.io.fileSystem('./selectorLayer/modelSave/model.json');
    //Loading again
    const savedModel = await tf.loadLayersModel(path);
    //Testing model
    const t1 = tf.tensor([1,2,3,4,5,6,7,8,9,10]).reshape([1,10]);
    const t2 = tf.tensor([10,9,8,7,6,5,4,3,2,1]).reshape([1,10]);
    savedModel.layers[2].selIndex = 0;
    const r1 = savedModel.predict([t1, t2]);
    assert (await tensorEquality(t1, r1) == true);
    savedModel.layers[2].selIndex = 1;
    const r2 = model.predict([t1, t2]);
    assert (await tensorEquality(t2, r2) == true);

    console.log("Selector Load Model Test Passed");
}


module.exports = {selectorLayerTest, selectorModelTest, selectorLoadModelTest};

// selectorLayerTest();
// selectorModelTest();
// selectorLoadModelTest();