const MulticlassClassification = require("./multiClassClassification").MultiClassClassification;
const {BinaryClassification} = require("./binaryClassification");

const postprocessingSteps = {MulticlassClassification, BinaryClassification};

module.exports.createPostprocessingStep = (step, params, data) => {
    const PostprocessingStep = postprocessingSteps[step];
    return new PostprocessingStep(params,data);
}
