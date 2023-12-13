const {AIRCVModel} = require('./airCVModel');
const {AIRNLPModel} = require('./airNLPModel');
const modelTypes = { 'cv': AIRCVModel, 'text': AIRNLPModel };

module.exports.createAIRModel = (model) => {
    const ModelType = modelTypes[model.type];
    return new ModelType(model.id, model.name, model.version, model.description, model.config);
}
