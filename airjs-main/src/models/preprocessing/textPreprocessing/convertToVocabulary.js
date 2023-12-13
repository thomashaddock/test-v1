const {inputDimension} = require("../../../utils/utils");

class ConvertToVocabulary {
    constructor(params, dataPoint) {
        this.input = dataPoint.tensorData;
        this.type = dataPoint.type;
        this.vocabularyDictionary = params.vocabulary;
        this.startCharacter = params.startCharacter;
        this.outOfVocab = params.oovCharacter;
        this.vocabSize = params.maxVocab;
        this.vocabulary = Object.keys(this.vocabularyDictionary);
        this.inputDim = inputDimension(this.input)
    }

    async apply(){
        //If input is a list of strings
        if(this.type === "text"){
            if(this.inputDim === 1){
                return this.convertToVocab(this.input);
            }
            else {
                //If the input is a list of a list of strings
                return this.input.map( wordList => {
                    return this.convertToVocab(wordList);
                })
            }
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }

    }

    convertToVocab(wordList){
        return [this.startCharacter].concat(wordList.map(word => {
            if(this.vocabulary.includes(word)){
                if(this.vocabSize !== null){
                    if(this.vocabularyDictionary[word] > this.vocabSize){
                        return this.outOfVocab;
                    }
                    else {
                        return this.vocabularyDictionary[word];
                    }
                }
                else {
                    return this.vocabularyDictionary[word];
                }

            }
            //otherwise out of vocab character
            else {
                return this.outOfVocab;
            }
        }));
    }

}

module.exports = {ConvertToVocabulary};

// async function test(){
//
//     //Tokenized sentence list to be encoded
//     const tokenizedSenteceList = [
//         [
//             'Hola',  'que',
//             'es',    'la',
//             'que',   'hay',
//             'salu2'
//         ],
//         [ 'A', 'todos', 'espero', 'que', 'la' ],
//         [ 'pasen', 'bien' ],
//         [ 'Que', 'me', 'cuentan' ],
//         [ 'punto' ],
//         [ 'punto1' ]
//     ];
//
//     const string = [
//         'Hola',  'que',
//         'es',    'la',
//         'que',   'hay',
//         'salu2'
//     ];
//     const vocab = {'hola': 23, 'salu2': 43, 'que': 22, 'es': 1000, 'la': 232, 'espero': 69, 'pasen': 420, 'bien': 2000, 'a': 5000, 'punto': 69};
//
//     //inputSize 1
//     const params = {vocabulary : vocab, startCharacter: 1, oovCharacter: 2, maxVocab : null};
//     const dataPoint = {data: tokenizedSenteceList, type: "nlp"};
//     const t1 = new ConvertToVocabulary(params,dataPoint);
//     console.log(await t1.apply());
    //
    // const t2 = new ConvertToVocabulary(string, vocab, 1, 2, 2000);
    // console.log(await t2.run());
    //inputSize 5
    // const t3 = new ConvertToVocabulary(vocab, tokenizedSenteceList, 5, "right");
    // console.log(await t3.run());

    // const t4 = new ConvertToVocabulary(vocab, tokenizedSenteceList, 5, "left");
    // console.log(await t4.run());

// }
// test();