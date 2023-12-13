/*ALLOWED_STEPS = (
    Add,
    Subtract,
    Multitply,
    Divide,
    ConvertToColor,
    Resize
)*/
const steps = require('./steps')

module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Image Preprocessor Steps",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["ImagePreprocessor"]
        },
        "steps": {
            "type": "array",
            "minItems": 1,
            "items": {
                "anyOf": [
                    steps.Add,
                    steps.Subtract,
                    steps.Multitply,
                    steps.Divide,
                    steps.ConvertToColor,
                    steps.Resize
                ]
            }
        },
    },
    "required": ["className", "steps"]
};