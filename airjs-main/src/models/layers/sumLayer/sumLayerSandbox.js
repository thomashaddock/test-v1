const {SumLayer} = require("./sumLayer");
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

const {tensorEquality} = require("../../../utils/tensors")
const assert = require('assert');


async function sumLayerTest(){
	const t1 = tf.tensor([1,2,3]);
	const t2 = tf.tensor([1,3,6]);

	const t3 = tf.tensor([-1,2,3,4]);
	const t4 = tf.tensor([4,3,2,1]);

	//Test 1
	const r1 = new SumLayer().apply([t1,t2]);
	const res1 = tf.tensor([2,5,9]);
	assert(await tensorEquality(r1, res1) == true);

	//Test 2
	const r2 = new SumLayer().apply([t3,t4]);
	const res2 = tf.tensor([3,5,5,5]);
	assert (await tensorEquality(r2, res2) == true);

	console.log("Sum Layer Test Passed");

}

async function sumModelTest(){

	const input1 = tf.input({shape: [10]});
	const input2 = tf.input({shape: [10]});

	const sumLayer = new SumLayer();

	const output = sumLayer.apply([input1, input2]);


	const model = tf.model({
		inputs: [input1, input2], 
		outputs: output});

	const data = tf.tensor([1,2,3,4,5,6,7,8,9,10]).reshape([1,10]);

	const r = model.predict([data, data]);
	const res = tf.tensor([2,4,6,8,10,12,14,16,18,20]);


	assert(await tensorEquality(r, res) == true);
	console.log("Sum Model Test Passed");

}
async function sumLoadModelTest(){

	//loading model
	const toBeLoaded = tfn.io.fileSystem('./sumLayer/model.json');
	const toBeSaved = tfn.io.fileSystem('./sumLayer/modelSave');
	const model = await tf.loadLayersModel(toBeLoaded);

	//Saving model
	await model.save(toBeSaved)
	const path = tfn.io.fileSystem('./sumLayer/modelSave/model.json');
	//Loading again
	const savedModel = await tf.loadLayersModel(path);
	//Test
	const data = tf.tensor([1,2,3,4,5,6,7,8,9,10],[1,10], "int32");
	const r = savedModel.predict([data, data]);
	const res = tf.tensor([2,4,6,8,10,12,14,16,18,20]);
	assert(await tensorEquality(r, res) == true);
	console.log("Sum Load Model Passed");

}

// sumLayerTest();
// sumModelTest();
// sumLoadModelTest();



module.exports = {sumLayerTest, sumModelTest, sumLoadModelTest};
