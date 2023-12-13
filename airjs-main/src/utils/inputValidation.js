const Validator = require('jsonschema').Validator;

module.exports.validateSchema = (data, schema) => {
    const validator = new Validator({ throwError: false });
    const validationResult = validator.validate(data, schema);

    if(validationResult.valid) {
        console.log('returning valid result')
        return {
            isValid: true
        };
    }
    return {
        errors: validationResult.errors?.length > 0 ? validationResult.errors : ["Schema validation failed"]
    }
};

module.exports.areValidModelFiles = (weightFiles) => {
    // todo check if all weight files listed in model.json are present in weightFiles
    return true
}