const steps = require("./steps")

module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Tabular Preprocessor Steps",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["TextPreprocessor"]
        },
        "steps": {
            "type": "array",
            "minItems": 1,
            "items": {
                "anyOf": [
                    steps.RemoveCharacters,
                    steps.ConvertToCase,
                    steps.Tokenize,
                    steps.ConvertToVocabulary,
                    steps.PadSequences
                ]
            }
        }
    },
    "required": ["className", "steps"]
};