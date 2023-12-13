const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

class multiDense extends tf.layers.Layer{
    static classname = "MultiDense";

    constructor(config) {
        super({});
        this.units = config.units;
        this.useBias = config.bias;
        this.activationString = config.activation;
        this.activation = tf.layers.activation({activation: config.activation});
        this.kernelInitializer = config.kernelInitializer;
        this.biasInitializer = config.biasInitializer;
    }


    set units(value){
        if(Number.isInteger(value)){
            this._units = value;
        }
        else {
            throw `units must be an integer, got ${value}`;
        }
    }

    get units(){ return this._units; }

    build(inputShape){

        //Checks if all input shapes are the same
        const compareTo = JSON.stringify(inputShape[0]);
        for(let i = 1; i < inputShape.length; i++){
            if(JSON.stringify(inputShape[i]) !== compareTo){
                throw `All input shapes must be equal, got ${inputShape}`;
            }
        }

        const simpliefiedShape = inputShape[0];
        const shape = [inputShape.length, simpliefiedShape[simpliefiedShape.length - 1], this.units];

        this.addWeight("weights", shape, null, this.kernelInitializer, null, true);

        if(this.useBias){
            this.addWeight("bias", [inputShape.length, this.units], null, this.biasInitializer, null, true);
        }

    }

    call(inputs){
        return tf.tidy(() => {
            const output = [];
            const weights = this.weights[0].val.arraySync();
            const bias = this.weights[1].val.arraySync();

            for(let task in inputs){
                const res = tf.matMul(inputs[task], weights[task]);
                output.push(res);
            }

            if(this.useBias){
                for(let task in inputs){
                    output[task].add(tf.tensor(bias[task]));
                }
            }

            if(this.activation != null){
                output.forEach( (value) => {
                    return this.activation.apply(value);
                })
            }

            return output;
        })

    }

    //TODO: Necessary for modelTest
    computeOutputShape(inputShape) {
        return
    }

    getConfig(){
        const config = super.getConfig();
        Object.assign(config, {units: this.units, use_bias: this.useBias, kernel_initializer: this.kernelInitializer, bias_initializer: this.biasInitializer, activation : this.activationString});
        return config;
    }
}