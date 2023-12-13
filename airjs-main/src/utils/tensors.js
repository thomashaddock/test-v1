const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

async function tensorEquality(t1, t2){
    if(t1.size != t2.size){
        throw "Tensors must be same size";
    }
    const res = await t1.equal(t2).sum().array()
    return( res === t1.size ? true : false);

}


module.exports = {tensorEquality};