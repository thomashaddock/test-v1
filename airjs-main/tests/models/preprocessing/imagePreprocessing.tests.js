const tf = require("@tensorflow/tfjs");
const {Resize} = require("../../../src/models/preprocessing/imagePreprocessing/resize");
const {Subtract} = require("../../../src/models/preprocessing/imagePreprocessing/subtract");
const {Divide} = require("../../../src/models/preprocessing/imagePreprocessing/divide");
const {Add} = require("../../../src/models/preprocessing/imagePreprocessing/add");
const {Multiply} = require("../../../src/models/preprocessing/imagePreprocessing/multiply");
const {ConvertToColor} = require("../../../src/models/preprocessing/imagePreprocessing/convertToColor");

describe("Image Preprocessing Tests", ()=>{

    it('should resize', async ()=>{
        const dataPoint = {tensorData: tf.randomNormal([30, 20, 1]), type: "cv"};
//     console.log(8/5);
//     console.log(3/2);
        const params = {size: [8, 2], method: "nearest neighbor", preserveAspectRatio: true, antialias: false};
        const t = new Resize(params, dataPoint);
        const tensor = await t.apply();
        expect(tensor).toBeInstanceOf(tf.Tensor)
    })

    it('should substract', async ()=>{
        const t1 = {data: tf.ones([30, 30, 3]), type: "cv"};
        const params = {'value': 4};
        const step = new Subtract(params, t1);
        const r = await step.run();
        r.print();
    })

    it('should divide', async ()=>{
        const t1 = {tensorData: tf.ones([30, 30, 3]), type: "cv"};
        const params = {'value': 4};
        const step = new Divide(params, t1);
        const r = await step.apply();
        r.print();
    })

    it('should add', async ()=>{
        const t1 = {tensorData: tf.ones([30, 30, 3]), type: "cv"};
        const params = {'value': 4};
        const step = new Add(params, t1);
        const r = await step.apply();
        r.print();
    })

    it('should multiply', async ()=>{
        const t1 = {tensorData: tf.ones([30, 30, 3]), type: "cv"};
        const params = {'value': 4};
        const step = new Multiply(params, t1);
        const r = await step.apply();
        r.print();
    })

    it('should convert to color', async ()=>{
        const t1 = {tensorData: tf.ones([30, 30, 1]), type: "cv"};
        const params = {'color': "RGB"};
        const step = new ConvertToColor(params, t1);
        const r = await step.apply();
        r.print();

        //rgb to greyscale
        //TODO: this is failing check fix and implement
        const t2 = {tensorData: tf.randomNormal([30, 30, 3]), type: "cv"};
        const params2 = {'color': "B+W"};
        const step2 = new ConvertToColor(params2, t2);
        const r2 = await step2.apply();
        r2.print();
    })
})
