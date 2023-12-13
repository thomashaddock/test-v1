module.exports = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Regression Postprocessing",
    "type": "object",
    "properties": {
        "className": {
            "type": "string",
            "enum": ["Regression"]
        },
        "params": {
            "type": "object",
            "properties": {
                "min": {
                    "type": ["number", "null"]
                },
                "max": {
                    "type": ["number", "null"]
                }
            },
            "required": ["min", "max"]
        }
    },
    "required": ["className", "params"]
};