const {Tokenize} = require("./textPreprocessing/tokenizer");
const {RemoveCharacters} = require("./textPreprocessing/removeCharacters");
const {ConvertToVocabulary} = require("./textPreprocessing/convertToVocabulary");
const {ConvertToCase} = require("./textPreprocessing/convertToCase");
const {PadSequences} = require("./textPreprocessing/padSequences");
const {Add} = require("./imagePreprocessing/add");
const {Multiply} = require("./imagePreprocessing/multiply");
const {Divide} = require("./imagePreprocessing/divide");
const {ConvertToColor} = require("./imagePreprocessing/convertToColor");
const {Subtract} = require("./imagePreprocessing/subtract");
const {Resize} = require("./imagePreprocessing/resize");


const preprocessingSteps = {Resize, Add, Subtract, Multiply, Divide, ConvertToColor, Tokenize, RemoveCharacters, ConvertToCase, ConvertToVocabulary, PadSequences};

module.exports.createPreprocessingStep = (step, params, dataPoint) => {
    const PreprocessingStep = preprocessingSteps[step];
    return new PreprocessingStep(params, dataPoint);
}

