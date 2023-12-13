const {FilterLayer} = require("./filterLayer");
const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");
const assert = require('assert');
const {tensorEquality} = require("../../../utils/tensors")

async function filterLayerTest(){
	//Test Tensor
	const t1 = tf.tensor([1,2,3,4]);
	const layer = new FilterLayer();

	//Output for filter on
	const output = layer.apply(t1);
	assert(await tensorEquality(output, t1) == true);

	//Turns off filter
	layer.turnOff()

	//Output for filter off
	const output1 = layer.apply(t1);
	assert(await tensorEquality(output1, tf.tensor([0,0,0,0])) ==  true);

	//Turns filter on
	layer.turnOn();

	//Output for filter on
	const output2 = layer.apply(t1);
	assert(await tensorEquality(output2, t1) == true);
	console.log("Filter Layer Test Passed");
	return
}

async function filterModelTest(){
	const input1 = tf.input({shape: [10]});
	const filterLayer = new FilterLayer();
	const output = filterLayer.apply(input1);

	const model = tf.model({
		inputs: input1,
		outputs: output});


	const t1 = tf.tensor([1,2,3,4,5,6,7,8,9,10]).reshape([1,10]);
	const t2 = tf.tensor([0,0,0,0,0,0,0,0,0,0]);
	// console.log(data);
	const r1 = model.predict(t1);
	assert(await tensorEquality(t1, r1)== true);


	model.layers[1].turnOff();

	const r2 = model.predict(t1);
	assert(await tensorEquality(r2, t2) == true);

	model.layers[1].turnOn();
	const r3 = model.predict(t1);
	assert(await tensorEquality(t1, r3) == true);
	console.log("Filter Model Test Passed");
}


async function filterLoadModelTest(){

	const toBeLoaded = tfn.io.fileSystem('./filterLayer/model.json');
	const toBeSaved = tfn.io.fileSystem('./filterLayer/modelSave');
	//Loading model
	const model = await tf.loadLayersModel(toBeLoaded);

	//Saving model
	await model.save(toBeSaved)
	const path = tfn.io.fileSystem('./filterLayer/modelSave/model.json');
	//Loading again
	const savedModel = await tf.loadLayersModel(path);
	//Test
	const t1 = tf.tensor([1,2,3,4,5,6,7,8,9,10]).reshape([1,10]);
	const t2 = tf.tensor([0,0,0,0,0,0,0,0,0,0]);
	const r1 = savedModel.predict(t1);
	assert(await tensorEquality(t1, r1)== true);

	savedModel.layers[1].turnOff();


	const r2 = savedModel.predict(t1);
	assert(await tensorEquality(r2, t2) == true);

	savedModel.layers[1].turnOn();
	const r3 = savedModel.predict(t1);
	assert(await tensorEquality(t1, r3) == true);
	console.log("Filter Model Load Test Passed");


}

module.exports = {filterLayerTest, filterModelTest, filterLoadModelTest};
// filterLayerTest();
// filterModelTest();
// filterLoadModelTest();