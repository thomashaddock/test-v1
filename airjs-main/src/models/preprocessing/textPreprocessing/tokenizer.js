const {inputDimension} = require("../../../utils/utils");

class Tokenize {
    constructor(params, dataPoint){
        this.input = dataPoint.tensorData;
        this.type = dataPoint.type;
        this.splitSentences = params.splitSentences;
        this.splitWords = params.splitWords;
        this.tokenPattern = params.tokenPattern;
        this.inputDim = inputDimension(this.input);
    }

    async apply(){
        //Checks to make sure dataPoint is the correct type
        if(this.type === "text"){
            //If input is a string
            if(this.inputDim === 0){
                let data = this.input;
                if(this.splitSentences){
                    data = this.splitSent(this.input);
                }
                if(this.splitWords){
                    if(inputDimension(data) === 1){
                        data = data.map(sentence => {
                            return this.splitWor(sentence, this.tokenPattern);
                        })
                    }
                    else {
                        data = this.splitWor(data, this.tokenPattern);
                    }
                }
                return data;
            }
            else if(this.inputDim === 1){
                //Input is a list of strings
                let data = this.input;
                if(this.splitSentences){
                    data = data.map(string => {
                        return this.splitSent(string);
                    })
                }
                if(this.splitWords){
                    if(inputDimension(data) === 2){
                       data = data.map(sentence => {
                           return sentence.map(word => {
                               return this.splitWor(word, this.tokenPattern);
                           })
                       })
                    }
                    else {
                        data = data.map(sentence => {
                            return this.splitWor(sentence, this.tokenPattern);
                        })
                    }
                }
                return data;
            }
            else {
                throw `Tokenizing for list of list of strings is not supported`;
            }
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }

    }

    splitWor(string, tokenPattern){
        return string.split(new RegExp(tokenPattern, "ug"));
    }

    splitSent(string){
        return string.split(".");
    }

}

module.exports = {Tokenize};

// async function test(){
//     const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pasen-bien. Que me cuentan. punto. punto1.";
//     // console.log(string.split('(?u)\\b\\w\\w+\\b'));
//     const stringList = [ 'A. oracion. hola. 2. kjskdfkl', '(tod)os', 'espe@ro', 'que', 'la' ];
//     const tokenizedSenteceList = [
//         [
//             'Hola me',  'llamo que',
//             'es pablo',    'la pedro',
//             'que',   'hay',
//             'salu2'
//         ],
//         [ 'A', '(tod)os', 'espe@ro', 'que la esten pasando bien', 'la' ],
//         [ 'pase%n', 'b&&ien' ],
//         [ 'Que', 'me', 'cuentan' ],
//         [ 'punto' ],
//         [ 'punto1' ]
//     ];
//     const params = {splitSentences: true, splitWords: true, tokenPattern: ' '};
//     const dataPoint = {data: stringList, type: "nlp"};
//     const f1 = new Tokenizer(params, dataPoint);
//     console.log(await f1.apply());
//     // console.log(f1.splitWor(string));
//     // const f2 = new Tokenizer(stringList);
//     // const f3 = new Tokenizer(tokenizedSenteceList);
//     // console.log(await f1.apply());
//     // console.log(await f2.apply());
//     // console.log(await f3.apply());
//
// }

// test();