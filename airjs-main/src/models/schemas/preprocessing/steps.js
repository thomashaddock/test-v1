module.exports = {
    // Image Preprocessor steps
    Add: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/addvalue.schema.json",
        "title": "Add",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["Add"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "number"
                    }
                },
                "required": ["value"]
            }
        },
        "required": ["className", "params"]
    },
    Subtract: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/substractvalue.schema.json",
        "title": "Subtract",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["Subtract"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "number"
                    }
                },
                "required": ["value"]
            }
        },
        "required": ["className", "params"]
    },
    Multitply: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/multiplyvalue.schema.json",
        "title": "Multitply",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["Multitply"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "number"
                    }
                },
                "required": ["value"]
            }
        },
        "required": ["className", "params"]
    },
    Divide: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/dividevalue.schema.json",
        "title": "Divide",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["Divide"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "number"
                    }
                },
                "required": ["value"]
            }
        },
        "required": ["className", "params"]
    },
    ConvertToColor: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/converttocolor.schema.json",
        "title": "ConvertToColor",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["ConvertToColor"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "color": {
                        "type": "string",
                        "enum": ["RGB", "B+W"]
                    }
                },
                "required": ["color"]
            }
        },
        "required": ["className", "params"]
    },
    Resize: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/resize.schema.json",
        "title": "Resize",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["Resize"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "size": {
                        "type": "array",
                        "minItems": 2,
                        "items": {
                            "type": "number"
                        }
                    },
                    "method": {
                        "type": "string",
                        "enum": ['bilinear', 'lanczos3', 'lanczos5', 'bicubic', 'gaussian',
                            'nearest', 'mitchellcubic']
                    },
                    "preserveAspectRatio": {
                        "type": "boolean"
                    },
                    "antialias": {
                        "type": "boolean"
                    }
                },
                "required": ["size", "method", "preserveAspectRatio", "antialias"]
            }
        },
        "required": ["className", "params"]
    },
    // Tablular Preprocessor steps
    ZScore: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/zscore.schema.json",
        "title": "ZScore",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["ZScore"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "means": {
                        "type": "array",
                        "minItem": 1,
                        "items": {
                            "type": "number"
                        }
                    },
                    "stds": {
                        "type": "array",
                        "minItem": 1,
                        "items": {
                            "type": "number"
                        }
                    },
                    "columns": {
                        "type": ["array", "null"],
                        "items": {
                            "type": "integer"
                        }
                    }
                },
                "required": ["means", "stds", "columns"]
            }
        },
        "required": ["className", "params"]
    },
    MinMax: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/minmax.schema.json",
        "title": "MinMax",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["MinMax"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "mins": {
                        "type": "array",
                        "minItem": 1,
                        "items": {
                            "type": "number"
                        }
                    },
                    "maxs": {
                        "type": "array",
                        "minItem": 1,
                        "items": {
                            "type": "number"
                        }
                    },
                    "columns": {
                        "type": ["array", "null"],
                        "items": {
                            "type": "integer"
                        }
                    }
                },
                "required": ["mins", "maxs", "columns"]
            }
        },
        "required": ["className", "params"]
    },
    OneHot: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/onehot.schema.json",
        "title": "OneHot",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["OneHot"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "column": {
                        "type": "integer"
                    },
                    "values": {
                        "type": "array",
                        "minItem": 1,
                        "items": {
                            "type": "number" // DOUBT: Array of what exactly?
                        }
                    }
                },
                "required": ["column", "values"]
            }
        },
        "required": ["className", "params"]
    },
    DropColumn: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/dropcolumn.schema.json",
        "title": "DropColumn",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["DropColumn"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "column": {
                        "type": "integer"
                    }
                },
                "required": ["column"]
            }
        },
        "required": ["className", "params"]
    },
    // Text Preprocessor steps
    RemoveCharacters: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/removecharacters.schema.json",
        "title": "RemoveCharacters",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["RemoveCharacters"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "removeDigits": {
                        "type": "boolean"
                    },
                    "removePunctuation": {
                        "type": "boolean"
                    }
                },
                "required": ["removeDigits", "removePunctuation"]
            }
        },
        "required": ["className", "params"]
    },
    ConvertToCase: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/converttocase.schema.json",
        "title": "ConvertToCase",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["ConvertToCase"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "lowercase": {
                        "type": "boolean"
                    }
                },
                "required": ["lowercase",]
            }
        },
        "required": ["className", "params"]
    },
    Tokenize: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/tokenize.schema.json",
        "title": "Tokenize",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["Tokenize"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "splitSentences": {
                        "type": "boolean"
                    },
                    "splitWords": {
                        "type": "boolean"
                    },
                    "tokenPattern": {
                        "type": "string"
                    }
                },
                "required": ["splitSentences", "splitWords", "tokenPattern",]
            }
        },
        "required": ["className", "params"]
    },
    ConvertToVocabulary: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/converttovocabulary.schema.json",
        "title": "ConvertToVocabulary",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["ConvertToVocabulary"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "vocabulary": {
                        "type": "object",
                    },
                    "startCharacter": {
                        "type": "number"
                    },
                    "oovCharacter": {
                        "type": "number"
                    },
                    "maxVocab": {
                        "type": ["number", "null"]
                    }
                },
                "required": ["vocabulary", "startCharacter", "oovCharacter", "maxVocab"]
            }
        },
        "required": ["className", "params"]
    },
    PadSequences: {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "https://airjs.com/padsequences.schema.json",
        "title": "PadSequences",
        "type": "object",
        "properties": {
            "className": {
                "type": "string",
                "enum": ["PadSequences"]
            },
            "params": {
                "type": "object",
                "properties": {
                    "padCharacter": {
                        "type": "number",
                    },
                    "length": {
                        "type": "number"
                    },
                    "padLocation": {
                        "type": "string"
                    },
                    "truncateLocation": {
                        "type": "string"
                    }
                },
                "required": ["padCharacter", "length", "padLocation", "truncateLocation"]
            }
        },
        "required": ["className", "params"]
    }
}