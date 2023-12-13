const tf = require("@tensorflow/tfjs");

class MultiClassClassification {
    constructor(params, logits){
        this.logits = logits;
        this.labelMap = params.labelMap;
        this.topK = params.topK;
        this.documents = params.documents;
        this.keywords = params.keywords;
    }

    async apply(){
        //Get tensor as list
        const values = await this.logits.data();

        //Stores values and indices
        const valuesAndIndices = [];
        for (let i = 0; i < values.length; i++) {
            valuesAndIndices.push({value: values[i], index: i});
        }
        //Sort list
        valuesAndIndices.sort((a, b) => {
            return b.value - a.value;
        });
        //Truncate the list to be of length topK
        const topKValuesAndIndices = valuesAndIndices.slice(0, this.topK);
        //For each value index pair in the list, map to class and probability

        if(this.keywords && this.documents){
            const topClassesAndProbs = topKValuesAndIndices.map(valueIndexPair => {
                return {className : this.labelMap[valueIndexPair.index], probability:valueIndexPair.value, documents: this.documents[valueIndexPair.index], keywords: this.keywords[valueIndexPair.index]};
            });
            return topClassesAndProbs;
        }
        else if(this.keywords && !this.documents){
            const topClassesAndProbs = topKValuesAndIndices.map(valueIndexPair => {
                return {className : this.labelMap[valueIndexPair.index], probability:valueIndexPair.value, keywords: this.keywords[valueIndexPair.index]};
            });
            return topClassesAndProbs;
        }
        else if(!this.keywords && this.documents){
            const topClassesAndProbs = topKValuesAndIndices.map(valueIndexPair => {
                return {className : this.labelMap[valueIndexPair.index], probability:valueIndexPair.value, documents: this.documents[valueIndexPair.index]};
            });
            return topClassesAndProbs;
        }
        else {
            const topClassesAndProbs = topKValuesAndIndices.map(valueIndexPair => {
                return {className : this.labelMap[valueIndexPair.index], probability:valueIndexPair.value};
            });
            return topClassesAndProbs;
        }

    }
}
module.exports = {MultiClassClassification};

// const cifarClasses = {
//     0: 'perro',
//     1: 'gato',
//     2: 'gorilla',
//     3: 'abeja',
//     4: 'hormiga',
//     5: 'orangutan',
//     6: 'tigre',
//     7: 'armadillo',
//     8: 'sapo',
//     9: 'anuel',
//     10: 'don'
// };

// async function test(topK,classMap){
//     const l = tf.tensor([3,1,2,4,5,1,6,0,9,0]);
//     const documents = [["test1", "test2"], ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"], ["meh.txt", "testing.txt", "doctu.txt", "brr.txt"],  ["test1", "test2"]];
//     const keywords = [["test1", "test2"], ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"],  ["test1", "test2"], ["sapp1", "sa[po2", "anuel", "brrr"],  ["test1", "test2"]];
//     const params = {topK: topK, classMap: classMap, documents: null, keywords: keywords};
//     const post = new MultiClassClassification(params, l);
//     console.log(await post.apply());
//     // return await getTopKClasses(logits, topK, classMap );
// }
//
// test(1, cifarClasses);