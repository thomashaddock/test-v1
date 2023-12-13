const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

class SelectorLayer extends tf.layers.Layer{
    static className = "SelectorLayer";
    selIndex;

    constructor(value){
        super({});
        this.selIndex = value.selIndex;

    }

    get selIndex (){
        return this.selIndex;
    }

    set selIndex(value){
        //Validate input
        this.selIndex = value;
    }

    call(inputs){
        return tf.tidy(() => {
            return inputs[this.selIndex];
        });
    }

    getClassName() {return "SelectorLayer";}

    computeOutputShape(inputShape) {
        return inputShape[this.selIndex];}

    getConfig(){
        const config = super.getConfig();
        Object.assign(config, {selIndex: this.selIndex});
        return config;

    }
}
tf.serialization.registerClass(SelectorLayer);
module.exports = {SelectorLayer};