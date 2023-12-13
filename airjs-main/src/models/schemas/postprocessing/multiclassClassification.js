module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Multiclass Classification Postprocessing",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["MulticlassClassification"]
        },
        "params": {
            "type": "object",
            "properties": {
                "labelMap": {
                    "type": "array",
                    "minItems": 2,
                    "items": [
                        {
                            "type": "string"
                        }
                    ]
                },
                "keywords": {
                    "type": "array",
                    "items": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    ]
                },
                "documents": {
                    "type": "array",
                    "items": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    ]
                },
            },
            "required": ["labelMap"]
        }
    },
    "required": ["className", "params"]
};