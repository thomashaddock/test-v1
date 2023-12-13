const tf = require('@tensorflow/tfjs');
const {data} = require("@tensorflow/tfjs");
class ConvertToColor {
    constructor(params, dataPoint){
        this.tensorData = dataPoint.tensorData;
        this.color = params.color;
        this.numChannels = this.tensorData.shape[2];
        this.type = dataPoint.type;
    }

    async apply(){
        //todo: check if number of channels matches the expected operation
        if(this.type === "cv"){
            if(this.color === "RGB"){
                return tf.image.grayscaleToRGB(this.tensorData);
            }
            else if (this.color === "B+W") {
                if(this.numChannels === 3){
                    const arr = await this.tensorData.array();
                    for(let i = 0; i < arr.length; i++){
                        for(let j = 0; j < arr[i].length; j++){
                            const avg = (arr[i][j][0]+ arr[i][j][1] + arr[i][j][2])/3;
                            arr[i][j] = [avg];
                        }
                    }
                    return tf.tensorData(arr);
                }
                else {
                    throw `Error in RGB to GreyScale: Last dimension of RGB image should be size 3, instead got size ${this.numChannels}.`;
                }

            }
            else {
                throw "Not yet implemented";
            }
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }


    }
}

module.exports = {ConvertToColor};