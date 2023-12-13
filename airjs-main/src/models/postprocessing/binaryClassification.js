// const tf = require("@tensorflow/tfjs");
// todo keyword lookup and document lookup
class BinaryClassification {
    constructor(params, logits){
        this.labelMap = params.labelMap;
        this.threshold = params.threshold;
        this.input = logits;
    }

    async apply(){
        const values = await this.input.data();
        if(values[0] >= this.threshold){
            return this.labelMap[1];
        }
        else {
            return this.labelMap[0];
        }
    }

}

module.exports = {BinaryClassification};