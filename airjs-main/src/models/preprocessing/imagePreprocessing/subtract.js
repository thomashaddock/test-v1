const tf = require("@tensorflow/tfjs");
class Subtract {
    constructor(params, dataPoint){
        this.value = params.value;
        this.data = dataPoint.data;
        this.type = dataPoint.type;
    }

    async run(){
        if(this.type === "cv"){
            return this.data.sub(this.value);
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }

    }
}

module.exports = {Subtract};