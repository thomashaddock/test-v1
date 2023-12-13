const tf = require("@tensorflow/tfjs");
const {Resize} = require("../../src/models/preprocessing/imagePreprocessing/resize");
const {DivideValue} = require("../../src/models/preprocessing/imagePreprocessing/divide");
const {AddValue} = require("../../src/models/preprocessing/imagePreprocessing/add");
const {MultiplyValue} = require("../../src/models/preprocessing/imagePreprocessing/multiply");
const {SubtractValue} = require("../../src/models/preprocessing/imagePreprocessing/subtract");
const {ConvertToColor} = require("../../src/models/preprocessing/imagePreprocessing/convertToColor");

async function testSubtract(){
    const t1 = tf.ones([30,30,3]);
    const params = {'value': 4};
    const step = new SubtractValue(params, t1);
    const r = await step.run();
    r.print();
}

async function testResize(){
    const t1 = tf.ones([30,30,3]);
    const params = {'img': t1, 'size': [15,15], 'method': "bilinear"};
    const step = new Resize(params, t1);
    const r = await step.run();
    console.log(r.shape);
}

async function testDivide(){
    const t1 = tf.ones([30,30,3]);
    const params = {'value': 4};
    const step = new DivideValue(params, t1);
    const r = await step.run();
    r.print();
}

async function testAdd(){
    const t1 = tf.ones([30,30,3]);
    const params = {'value': 4};
    const step = new AddValue(params, t1);
    const r = await step.run();
    r.print();
}

async function testMultiply(){
    const t1 = tf.ones([30,30,3]);
    const params = {'value': 4};
    const step = new MultiplyValue(params, t1);
    const r = await step.run();
    r.print();
}

async function testConvertToColor(){
    //greyscale to rgb
    const t1 = tf.ones([30,30,1]);
    const params = {'color': "RGB"};
    const step = new ConvertToColor(params, t1);
    const r = await step.run();
    r.print();

    //rgb to greyscale
    const t2 = tf.randomNormal([30,30,3]);
    const params2 = {'color': "B+W"};
    const step2 = new ConvertToColor(params2, t2);
    const r2 = await step2.run();
    r2.print();
}

async function tests(){
    await testAdd();
    await testSubtract();
    await testDivide();
    await testMultiply();
    await testConvertToColor();
    await testResize();
}

tests();