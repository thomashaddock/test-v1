const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

class multiMaxPool2D extends tf.layers.Layer {
    static className = "MultiMaxPool2D";

    constructor(config){
        super();
        this.poolSize = config.poolSize;
        this.strides = config.strides;
        this.padding = config.padding;
        //TODO: Figure out how to solve naming scheme issue
    }

    set poolSize(value){
        this._poolSize = ((value === null)? [2,2] : value);
    }

    get poolSize(){ return this._poolSize; }

    set strides(value){
        this._strides = ((value === null)? [1,1] : value);
    }

    get strides(){ return this._strides;}


    call(inputs) {
        return tf.tidy(()=> {
            const output = [];
            for (let task in inputs) {
                const res = tf.pool(inputs[task], this.poolSize, "max", this.padding, null, this.strides);
                output.push(res);
            }
            return;
        })

    }

    //TODO: Necesary to run Model
    computeOutputShape(inputShape) {
        return
    }

    getConfig() {
        const config = super.getConfig();
        Object.assign(config, {poolSize: this.poolSize, strides: this.strides, padding: this.padding});
        return config;
    }

}