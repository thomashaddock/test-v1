module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Binary Classification Postprocessing",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["BinaryClassification"]
        },
        "params": {
            "type": "object",
            "properties": {
                "labelMap": {
                    "type": "array",
                    "minItems": 2,
                    "maxItems": 2,
                    "items": [
                        {
                            "type": "string"
                        }
                    ]
                },
                "threshold": {
                    "type": "number",
                    "minimum": 0,
                    "maximum": 1
                }
            },
            "required": ["labelMap", "threshold"]
        }
    },
    "required": ["className", "params"]
};