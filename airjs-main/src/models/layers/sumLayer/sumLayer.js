const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

class SumLayer extends tf.layers.Layer{

	//Necesarry for loading the model
	static className = "SumLayer";
	constructor(inputs){
		super({});
	}

	call(inputs){
		return tf.tidy (() => {
			return tf.addN(inputs);
		});
	}

	getClassName() { return 'SumLayer'; }

	computeOutputShape(inputShape) {		
		return inputShape[0];}

	getConfig(){
		return super.getConfig();
	}


}
tf.serialization.registerClass(SumLayer);
module.exports = {SumLayer};