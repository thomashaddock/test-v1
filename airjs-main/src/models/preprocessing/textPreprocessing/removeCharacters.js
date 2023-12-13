//Works for string, list of strings and list of list of strings
const {inputDimension} = require("../../../utils/utils");
class RemoveCharacters {
    constructor(params,dataPoint){
        this.input = dataPoint.tensorData;
        this.dataType = dataPoint.type;
        this.removeDigits = params.removeDigits;
        this.removePunctuation = params.removePunctuation;
        this.inputDim = inputDimension(this.input);
    }

    async apply() {
        if(this.dataType === "text"){
            if(this.inputDim === 0){
                if(this.removePunctuation && this.removeDigits){
                    return this.removeCharacters(this.input);
                }
                if(this.removePunctuation && !this.removeDigits){
                    return this.removePunct(this.input);
                }
                if(!this.removePunctuation && this.removeDigits){
                    return this.removeDig(this.input);
                }
                else {
                    return this.input;
                }

            }
            if(this.inputDim === 1){
                return this.input.map(word => {
                    if(this.removePunctuation && this.removeDigits){
                        return this.removeCharacters(word);
                    }
                    if(this.removePunctuation && !this.removeDigits){
                        return this.removePunct(word);
                    }
                    if(!this.removePunctuation && this.removeDigits){
                        return this.removeDig(word);
                    }
                    else {
                        return word;
                    }

                })
            }
            else {

                return this.input.map( sentence => {
                    return sentence.map(word => {
                        if(this.removePunctuation && this.removeDigits){
                            return this.removeCharacters(word);
                        }
                        if(this.removePunctuation && !this.removeDigits){
                            return this.removePunct(word);
                        }
                        if(!this.removePunctuation && this.removeDigits){
                            return this.removeDig(word);
                        }
                        else {
                            return word;
                        }
                    });
                });
            }
        }
        else {
            throw `Error: dataPoint type and preprocessing step mismatch`;
        }


    }
    removeCharacters(word){
        return word.replace(/[^A-Za-z]+/g, ' ');
    }
    removeDig(word){
        return word.replace(/[0-9]/g, '');
    }
    removePunct(word){
        const t = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?@]/g,"");
        return t.replace(/\s{2,}/g," ");
    }

}

module.exports = {RemoveCharacters};

// async function test(){
//     const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pas45en-bien. Que me cuen22tan. punto. punto1.";
//     const stringList = [ 'A', '(tod)os', 'espe@ro', 'que', 'la' ];
//     const tokenizedSenteceList = [
//         [
//             'Hola',  'que',
//             'es',    'la',
//             'que',   'hay',
//             'salu2'
//         ],
//         [ 'A', '(tod)os', 'espe@222ro', 'que', 'la' ],
//         [ 'pase%n', 'b&&ien' ],
//         [ 'Que', 'me', 'cuentan' ],
//         [ 'punto' ],
//         [ 'punto1' ]
//     ];
//     const dataPoint = {data: tokenizedSenteceList, type: "nlp"};
//     const params = {removeDigits: false, removePunctuation: true };
//     const f = new RemoveCharacters(params, dataPoint);
//
//     console.log(await f.apply());
// }
// test();