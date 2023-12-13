var imagePreprocessorSchema = require('./preprocessing/imagePreprocessor');
var tabularPreprocessorSchema = require('./preprocessing/tabularPreprocessor');
var multiclassClassification = require('./postprocessing/multiclassClassification');
var binaryClassification = require('./postprocessing/binaryClassification');
var objectDetection = require('./postprocessing/objectDetection');
var regression = require('./postprocessing/regression');
const textProcessor = require('./preprocessing/textPreprocessor');

module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://airjs.com/config.schema.json",
    "title": "Config",
    "description": "Model config file schema",
    "type": "object",
    "properties": {
        "modelConfig": {
            "description": "Config file root",
            "type": "object",
            "properties": {
                /*
                MLFlow URI, User, and Token will be tested as null
                Future enhanchement will add validation to these
                 */
                "uri": {
                    "description": "MLFlow uri",
                    "type": ["string", "null"]
                },
                "user": {
                    "description": "MLFlow user",
                    "type": ["string", "null"]
                },
                "token": {
                    "description": "MLFlow token",
                    "type": ["string", "null"]
                },
                "inputShapes": {
                    "description": "Input shapes",
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "number"
                        }
                    }
                },
                "preprocessing": {
                    "description": "Preprocessing steps",
                    "type": "array",
                    "minItems": 1,
                    "maxItems": 1,
                    "items": {
                        "anyOf": [
                            textProcessor,
                            imagePreprocessorSchema,
                            tabularPreprocessorSchema
                        ]
                    }
                },
                "postprocessing": {
                    "description": "Postprocessing steps",
                    "type": "array",
                    "minItems": 1,
                    "maxItems": 1,
                    "items": {
                        "anyOf": [
                            multiclassClassification,
                            binaryClassification,
                            objectDetection,
                            regression
                        ]
                    }
                }
            },
            "required": ["uri", "user", "token", "inputShapes", "preprocessing", "postprocessing"]
        }
    },
    "required": ["modelConfig"]
};