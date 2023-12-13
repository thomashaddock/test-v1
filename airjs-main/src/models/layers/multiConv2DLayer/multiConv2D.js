const tfn = require("@tensorflow/tfjs-node");
const tf = require("@tensorflow/tfjs");

class MultiConv2D extends tf.layers.Layer {
    static className = "MultiConv2D";

    constructor(config){
        super({});
        this.filters = config.filters;
        this.kernelSize = config.kernelSize;
        this.padding = config.padding;
        this.strides = config.strides;
        this.useBias = config.useBias;
        this.activationString = config.activation;
        this.activation = tf.layers.activation({activation: config.activation});
        this.kernelInitializer = config.kernelInitializer;
        this.biasInitializer = config.biasInitializer;
        this.testing = config.testing;

        //Renaming is done for it to be compatible with python naming conventions
        //Won't work with multiple multiConv layers
        //TODO: Figure out how to solve naming scheme problem
        //      The problem: Layers in python are named layer_name_#layernumber
        //                   layers in tfjs are named layer_name_LayerName#layernumber
        const num = this.name.split("D")[1]
        this.name = "multi_conv2d"; //+ num?
    }

    set filters(value){
        if(Number.isInteger(value)){
            this._filters = value;
        }
        else {
            throw `filter must be integer, got ${value}`;
        }
    }

    get filters(){ return this._filters; }
    get kernelSize(){ return this._kernelSize; }

    set kernelSize(value){
        this._kernelSize = ((Number.isInteger(value) === true)? [value,value] : value);

    }

    set testing(value){
        this._testing = ((value === null) ? false : value);
    }

    get testing(){return this._testing;}

    build(inputShape){

        //Checks if all input shapes are the same
        const compareTo = JSON.stringify(inputShape[0]);
        for(let i = 1; i < inputShape.length; i++){
            if(JSON.stringify(inputShape[i]) !== compareTo){
                throw `All input shapes must be equal, got ${inputShape}`;
            }
        }

        //Assuming all input shapes are the same
        const simplifiedShape = inputShape[0];
        const numTasks = inputShape.length;
        const channels = simplifiedShape[simplifiedShape.length - 1];
        const shape = [numTasks, this.kernelSize[0], this.kernelSize[1], channels, this.filters];

        //Alternate weight matrix for testing
        if(this.testing){
            this.w = tf.ones(shape);
        }

        //Creates weight matrix
        this.addWeight("weights", shape, null, this.kernelInitializer, null, true);

        //Creates bias matrix
        if (this.useBias) {
            this.addWeight("bias", [inputShape.length, this.filters], null, this.biasInitializer, null, true);
        }
        return
    }

    call(inputs){
        return tf.tidy(() => {

            const output = [];
            const weights = this.weights[0].val.arraySync();
            const bias = this.weights[1].val.arraySync();

            if(this.testing) {
                //With testing weights
                for (let task in inputs) {
                    const convOutput = tf.conv2d(inputs[task], this.w.arraySync()[task], this.strides, this.padding);
                    output.push(convOutput);
                }
            }

            else {
                //With regular weights
                for (let task in inputs) {
                    const convOutput = tf.conv2d(inputs[task], weights[task], this.strides, this.padding);
                    output.push(convOutput);
                }
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

    computeOutputShape(inputShape){
        return inputShape;
    }

    getConfig(){
        const config = super.getConfig();
        Object.assign(config, {filters: this.filters, kernel_size: this.kernelSize, padding: this.padding, strides: this.strides,
        use_bias: this.useBias, kernel_initializer: this.kernelInitializer, bias_initializer: this.biasInitializer, activation: this.activationString});
        return config;
    }

}
tf.serialization.registerClass(MultiConv2D);
module.exports = {MultiConv2D};

