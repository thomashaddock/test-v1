const tf = require("@tensorflow/tfjs");



class FilterLayer extends tf.layers.Layer {
	static className = 'FilterLayer';

	constructor(config) {
		super(config);
	}

	// //Build is necessary for all layers that have weights
	build(){
		this.isOn = tf.variable(tf.scalar(true));
	}

	call(input){
		return tf.tidy (() => {
			return tf.where(this.isOn, input[0] ?? input, tf.zeros(input[0]?.shape ?? input.shape));
		});
	}

	computeOutputShape(inputShape){
		return inputShape;
	}


	turnOn(){
		this.isOn.assign(tf.scalar(true));
	}

	turnOff(){
		this.isOn.assign(tf.scalar(false));
	}

	getConfig() {
		return super.getConfig();
	}
}

tf.serialization.registerClass(FilterLayer);

module.exports = {FilterLayer};
