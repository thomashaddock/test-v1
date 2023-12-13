const tf = require("@tensorflow/tfjs");
class Resize {
    constructor(params, dataPoint){
        this.tensorData = dataPoint.tensorData;
        this.type = dataPoint.type;
        this.size = params.size;
        this.method = params.method;
        this.preserveAspectRatio = params.preserveAspectRatio;
        this.antialias = params.antialias;
    }

    async apply(){
        if(this.type === "cv"){
            if(this.method === 'nearest neighbor'){
                if(this.preserveAspectRatio){
                    return tf.tidy(() => {
                        const size = this.newSize(this.tensorData.shape, this.size[0]);
                        return tf.image.resizeBilinear(this.tensorData, size);
                    });

                }
                else {
                    return tf.tidy(() => {
                        return tf.image.resizeNearestNeighbor(this.tensorData, this.size);
                    });

                }

            }else if (this.method === "bilinear"){
                if(this.preserveAspectRatio){
                    return tf.tidy(() => {
                        const size = this.newSize(this.tensorData.shape, this.size[0]);
                        return tf.image.resizeBilinear(this.tensorData, size);
                    });

                }else {
                    return tf.tidy(() => {
                        return tf.image.resizeBilinear(this.tensorData, this.size)
                    });

                }

            }else {
                throw `Resize Method ${this.method} is not yet implemented`;
            }
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }

    }

    newSize(inputShape, width){
        const aspectRatio = inputShape[1]/inputShape[0];
        const height = Math.ceil(aspectRatio*width);
        return [width, height];
    }
}

module.exports = {Resize};

// async function test(){
//     const dataPoint = {data: tf.randomNormal([30, 20, 1]), type: "cv"};
//     console.log(8/5);
//     console.log(3/2);
//     const params = {size: [8, 2], method: "nearest neighbor", preserveAspectRatio: true, antialias: false};
//     const t = new Resize(params, dataPoint);
//     console.log(await t.apply())
// }
// test();