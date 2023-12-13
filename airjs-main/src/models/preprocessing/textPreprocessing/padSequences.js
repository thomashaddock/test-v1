const {inputDimension} = require("../../../utils/utils");
class PadSequences {
    constructor(params, dataPoint){
        this.input = dataPoint.tensorData;
        this.type = dataPoint.type;
        this.paddingCharacter = params.padCharacter;
        this.paddingLocation = params.padLocation;
        this.truncationLocation = params.truncateLocation;
        this.maxLen = params.length;
        this.inputDim = inputDimension(this.input);
    }

    async apply() {
        if(this.type === "text"){
            if(this.inputDim === 1){
                return this.padSequence(this.input);
            }
            else {
                return this.input.map(sequence => {
                    return this.padSequence(sequence);
                })
            }
        }
        else {
            throw `Error dataPoint type and preprocessing step mismatch`;
        }



    }

    padSequence(sequence){
        if(sequence.length < this.maxLen){
            const pads = this.maxLen - sequence.length;
            if(this.paddingLocation === "pre"){
                const p = new Array(pads);
                for(let i = 0; i < pads; i++){
                    p[i] = this.paddingCharacter;
                }
                return p.concat(sequence);
            }
            else {
                for(let i = sequence.length; i < this.maxLen; i++){
                    sequence.push(this.paddingCharacter);
                }
                return sequence;
            }
        }
        // Truncates if sentence longer than input size
        else {
            if(this.truncationLocation === "post"){
                console.log(sequence);
                return sequence.slice(0, this.maxLen);
            }
            else {
                console.log(sequence);
                const value = sequence.length - this.maxLen;
                return sequence.slice(value, sequence.length);
            }

        }
    }
}

module.exports = {PadSequences};

// async function test(){
//     const sequenceList = [ [ 1, 2, 22, 1000, 232, 22, 2, 43 ],
//         [ 1, 2, 2, 69, 22, 232 ],
//         [ 1, 420, 2000 ],
//         [ 1, 2, 2, 2 ],
//         [ 1, 69 ],
//         [ 1, 2 ] ];
//     const sequence = [ 1, 2, 22, 1000, 232, 22, 2, 43 ];
//     const params = {padCharacter: 0, length: 28 , padLocation: "pre", truncateLocation:"pre" };
//     const dataPoint = {data: sequenceList, type: "nlp"};
//     const test = new PadSequences(params, dataPoint);
//     console.log(await test.apply());
//
// }
// test();