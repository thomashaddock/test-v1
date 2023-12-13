const tf = require("@tensorflow/tfjs");
const {MultiClassClassification} = require("../../../src/models/postprocessing/multiClassClassification");
const {Regression} = require("../../../src/models/postprocessing/regression");
const {BinaryClassification} = require("../../../src/models/postprocessing/binaryClassification");

describe("Postprocessing Tests", ()=>{

    it('should classify multi class', async ()=>{
        const cifarClasses = {
                0: 'perro',
                1: 'gato',
                2: 'gorilla',
                3: 'abeja',
                4: 'hormiga',
                5: 'orangutan',
                6: 'tigre',
                7: 'armadillo',
                8: 'sapo',
                9: 'anuel',
                10: 'don'
                            };


        const l = tf.tensor([3,1,2,4,5,1,6,0,9,0]);
        const documents = [["test1", "test2"], ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"], ["meh.txt", "testing.txt", "doctu.txt", "brr.txt"],  ["test1", "test2"]];
        const keywords = [["test1", "test2"], ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"], ["sapp1", "sa[po2", "anuel", "brrr"],  ["test1", "test2"]];
        const params = {topK: 1, labelMap: cifarClasses, documents: null, keywords: keywords};
        const post = new MultiClassClassification(params, l);
        console.log(await post.apply());
    })

    it('should regression', async ()=>{
        const t = tf.tensor([1]);
        const params = {min: 0, max: 100};
        const post = new Regression(params,t);
        console.log(await post.apply());
    })

    it('should binary classification', async ()=>{
        const cifarClasses = {
            0: 'perro',
            1: 'gato',
        };
        const t = tf.tensor([2]);
        const params = {threshold: 1, labelMap: cifarClasses};
        const post = new BinaryClassification(params,t);
        console.log(await post.apply());
    })
})
