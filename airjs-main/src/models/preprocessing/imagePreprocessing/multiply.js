const tf = require("@tensorflow/tfjs");
class Multiply {
    constructor(params, dataPoint){
        this.tensorData = dataPoint.tensorData;
        this.value = params.value;
        this.type = dataPoint.type;
    }

    async apply(){
        if(this.type === "cv"){
            return this.tensorData.mul(this.value);
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }

    }
}



module.exports = {Multiply};