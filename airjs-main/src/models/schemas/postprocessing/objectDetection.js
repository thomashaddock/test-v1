module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Object Detection Postprocessing",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["ObjectDetection"]
        },
        "params": {
            "type": "object",
            "properties": {
                "topN": {
                    "type": "number"
                },
                "labelMap": {
                    "type": "array",
                    "minItems": 1, 
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
            "required": ["topN", "labelMap", "threshold"]
        }
    },
    "required": ["className", "params"]
};