const tf = require("@tensorflow/tfjs");
//Datapoint must be a tensor
class Divide {
    constructor(params, dataPoint){
        this.value = params.value;
        this.tensorData = dataPoint.tensorData;
        this.type = dataPoint.type;
    }

    async apply(){
        if(this.type === "cv"){
            return this.tensorData.div(this.value);
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }
    }
}
module.exports = {Divide};
