const tf = require("@tensorflow/tfjs");
class Regression {
    constructor(params, logits){
        this.min = params.min;
        this.max = params.max;
        this.input = logits;
    }

    async apply(){
        const values = await this.input.data();
        return values[0]*(this.max - this.min) + this.min;
    }

}

module.exports = {Regression};

// async function test(){
//     const t = tf.tensor([1]);
//     const params = {min: 0, max: 100};
//     const post = new Regression(params,t);
//     console.log(await post.apply());
// }
//
// test();