const tf = require("@tensorflow/tfjs");
class Add {
    constructor(params, dataPoint){
        this.value = params.value;
        this.tensorData = dataPoint.tensorData;
        this.type = dataPoint.type;
    }

    async apply(){
        if(this.type === "cv"){
            return this.tensorData.add(this.value);
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }

    }
}


module.exports = {Add};