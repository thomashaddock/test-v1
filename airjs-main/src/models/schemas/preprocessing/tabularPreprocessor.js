const steps = require("./steps")

module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Tabular Preprocessor Steps",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["TabularPreprocessor"]
        },
        "steps": {
            "type": "array",
            "minItems": 1,
            "items": {
                "anyOf": [
                    steps.ZScore,
                    steps.MinMax,
                    steps.OneHot,
                    steps.DropColumn,
                ]
            }
        }
    },
    "required": ["className", "steps"]
};