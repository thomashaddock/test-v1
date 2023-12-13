const {inputDimension} = require("../../../utils/utils");
class ConvertToCase {
    constructor(params, dataPoint){
        this.input = dataPoint.tensorData;
        this.type = dataPoint.type;
        this.toLower = params.lowercase;
        this.inputDim = inputDimension(this.input);
    }

    async apply() {
        if(this.type === "text"){
            if(this.inputDim === 0){
                if(this.toLower){
                    return this.input.toLowerCase();
                }
                else {
                    return this.input.toUpperCase();
                }
            }
            if(this.inputDim === 1){
                if(this.toLower){

                    return this.input.map(word => {
                        return word.toLowerCase();
                    });
                }

                else {
                    return this.input.map(word => {
                        return word.toUpperCase();
                    });
                }
            }
            else {
                if(this.toLower){
                    return this.input.map(sentence => {
                        return sentence.map( word => {
                            return word.toLowerCase();
                        })
                    })

                }
                else {
                    return this.input.map(sentence => {
                        return sentence.map( word => {
                            return word.toUpperCase();
                        })
                    })
                }
            }
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }


    }

}

module.exports = {ConvertToCase};
// async function test(){
//     const string = "Hola que (es la que hay) salu2. A todos ((espero que l?a? pasen-bien. Que me cuentan. punto. punto1.";
//     const stringList = [ 'A', '(tod)os', 'espe@ro', 'que', 'la' ];
//     const tokenizedSenteceList = [
//         [
//             'Hola',  'que',
//             'es',    'la',
//             'que',   'hay',
//             'salu2'
//         ],
//         [ 'A', '(tod)os', 'espe@ro', 'que la esten pasando bien', 'la' ],
//         [ 'pase%n', 'b&&ien' ],
//         [ 'Que', 'me', 'cuentan' ],
//         [ 'punto' ],
//         [ 'punto1' ]
//     ];
//
//     const params = {lowercase: false};
//     const dataPoint = {data: tokenizedSenteceList, type: "nlp"};
//     const f1 = new ConvertToCase(params,dataPoint);
//     // const f2 = new ConvertToCase(params, stringList);
//     // const f3 = new ConvertToCase(params, tokenizedSenteceList);
//     console.log(await f1.apply());
//     // console.log(await f2.apply());
//     // console.log(await f3.apply());
// }
// test();