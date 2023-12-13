module.exports = {
    /**
     * Example Config JSON
     * 
     * @test Should Pass
     */
    exampleConfig: {
        "modelConfig": {
            "name": "DummySentimentClassification",
            "version": null,
            "description": "",
            "uri": null,
            "user": null,
            "token": null,
            "inputShapes": [
                [
                    128
                ]
            ],
            "preprocessing": [
                {
                    "className": "TextPreprocessor",
                    "steps": [
                        {
                            "className": "RemoveCharacters",
                            "params": {
                                "removeDigits": true,
                                "removePunctuation": true
                            }
                        },
                        {
                            "className": "ConvertToCase",
                            "params": {
                                "lowercase": true
                            }
                        },
                        {
                            "className": "Tokenize",
                            "params": {
                                "splitSentences": false,
                                "splitWords": true,
                                "tokenPattern": "(?u)\\b\\w\\w+\\b"
                            }
                        },
                        {
                            "className": "ConvertToVocabulary",
                            "params": {
                                "vocabulary": {
                                    "test": 3,
                                    "vocabulary": 4
                                },
                                "startCharacter": 1,
                                "oovCharacter": 2,
                                "maxVocab": null
                            }
                        },
                        {
                            "className": "PadSequences",
                            "params": {
                                "padCharacter": 0,
                                "length": 128,
                                "padLocation": "post",
                                "truncateLocation": "post"
                            }
                        }
                    ]
                }
            ],
            "postprocessing": [
                {
                    "className": "BinaryClassification",
                    "params": {
                        "labelMap": [
                            "negative",
                            "postitive"
                        ],
                        "threshold": 0.5
                    }
                }
            ]
        }
    },
    /**
     * Full Config JSON
     * 
     * This JSON includes a full config with all preprocessing steps and postprocessing steps.
     * @test Should Pass
     */
    fullConfig: {
        modelConfig: {
            name: '',
            description: '',
            version: '',
            uri: null,
            user: null,
            token: null,
            inputShapes: [
                [
                    128
                ]
            ],
            preprocessing: [
                {
                    className: 'ImagePreprocessor',
                    steps: [
                        {
                            className: 'ConvertToColor',
                            params: {
                                color: 'RGB'
                            }
                        },
                        {
                            className: 'Resize',
                            params: {
                                size: [100, 100],
                                method: 'bilinear',
                                preserveAspectRatio: false,
                                antialias: false
                            }
                        },
                        {
                            className: 'AddValue',
                            params: {
                                value: 1.0
                            }
                        }
                    ]
                },
                {
                    className: 'TabularPreprocessor',
                    steps: [
                        {
                            className: 'ZScore',
                            params: {
                                means: [1],
                                stds: [1],
                                columns: null
                            }
                        },
                        {
                            className: 'MinMax',
                            params: {
                                mins: [1],
                                maxs: [1],
                                columns: null
                            }
                        },
                        {
                            className: 'OneHot',
                            params: {
                                column: 1,
                                values: [1, 2, 3, 4, 5, 6]
                            }
                        },
                        {
                            className: 'DropColumn',
                            params: {
                                column: 1
                            }
                        }
                    ]
                },
                {
                    "className": "TextPreprocessor",
                    "steps": [
                        {
                            "className": "RemoveCharacters",
                            "params": {
                                "removeDigits": true,
                                "removePunctuation": true
                            }
                        },
                        {
                            "className": "ConvertToCase",
                            "params": {
                                "lowercase": true
                            }
                        },
                        {
                            "className": "Tokenize",
                            "params": {
                                "splitSentences": false,
                                "splitWords": true,
                                "tokenPattern": "(?u)\\b\\w\\w+\\b"
                            }
                        },
                        {
                            "className": "ConvertToVocabulary",
                            "params": {
                                "vocabulary": {
                                    "test": 3,
                                    "vocabulary": 4
                                },
                                "startCharacter": 1,
                                "oovCharacter": 2,
                                "maxVocab": null
                            }
                        },
                        {
                            "className": "PadSequences",
                            "params": {
                                "padCharacter": 0,
                                "length": 128,
                                "padLocation": "post",
                                "truncateLocation": "post"
                            }
                        }
                    ]
                }
            ],
            postprocessing: [
                {
                    className: 'MulticlassClassification',
                    params: {
                        topN: 1,
                        labelMap: [
                            "cat",
                            "dog"
                        ]
                    }
                },
                {
                    className: 'BinaryClassification',
                    params: {
                        labelMap: [
                            "cat",
                            "dog"
                        ],
                        threshold: 0.3
                    }
                },
                {
                    className: 'ObjectDetection',
                    params: {
                        topN: 5,
                        labelMap: [
                            "cat"
                        ],
                        threshold: 0.3
                    }
                },
                {
                    className: 'Regression',
                    params: {
                        min: 1,
                        max: 2
                    }
                }
            ]
        }
    },
    /**
     * Simple Config JSON
     * 
     * This JSON includes a simple config with its minimum requirements.
     * @test Should Pass
     */
    simpleConfig: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: []
        }
    },
    /**
     * Config JSON w/ Preprocessing steps only
     * 
     * This JSON includes a config with only preprocessing steps.
     * @test Should Pass
     */
    onlyPreprocessing: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            AddValue: {
                                value: 1.0
                            }
                        },
                        {
                            SubtractValue: {
                                value: 1.0
                            }
                        },
                        {
                            MultitplyValue: {
                                value: 1.0
                            }
                        },
                        {
                            DivideValue: {
                                value: 1.0
                            }
                        },
                        {
                            ConvertToColor: {
                                color: "RGB" // RGB or B+W
                            }
                        },
                        {
                            Resize: {
                                size: [123, 123],
                                method: 'mitchellcubic', //['bilinear', 'lanczos3', 'lanczos5', 'bicubic', 'gaussian', 'nearest', 'mitchellcubic']
                                preserveAspectRatio: true,
                                antialias: true
                            }
                        }
                    ]
                },
                {
                    TabularPreprocessor: [
                        {
                            ZScore: {
                                means: [1],
                                stds: [1],
                                columns: null
                            }
                        },
                        {
                            MinMax: {
                                mins: [1],
                                maxs: [1],
                                columns: null
                            }
                        },
                        {
                            OneHot: {
                                column: 1,
                                values: [1, 2, 3, 4, 5, 6]
                            }
                        },
                        {
                            DropColumn: {
                                column: 1
                            }
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Preprocessing AnyOf Requirement
     * 
     * Preprocessing can only incluide any of the following objects:
     * @param ImagePreprocessor
     * @param TabularPreprocessor
     * 
     * @test Should Fail
     */
    preprocessingAnyOfRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    RandomPreprocessor: []
                }
            ],
            PostProcessing: []
        }
    },
    /**
     * Image Preprocessor Missing Properties
     * 
     * Test malformed ImagePreprocessor Preprocessing
     * @test Should Fail
     */
    imagePreprocessorMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [

                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor AnyOf Requirement
     * 
     * ImagePreprocessor Preprocessing can only be one of the following steps:
     * @param AddValue
     * @param SubtractValue
     * @param MultitplyValue
     * @param DivideValue
     * @param ConvertToColor
     * @param Resize
     * 
     * @test Should Fail
     */
    imagePreprocessorAnyOfRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            RandomStep: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor AddValue Malformed
     * 
     * ImagePreprocessor Preprocessing AddValue step is of a type object with the following properties: 
     * @param {number} value number
     * 
     * @test Should Fail
     */
    imagePreprocessorAddValueMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            AddValue: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor SubtractValue Malformed
     * 
     * ImagePreprocessor Preprocessing SubtractValue step is of a type object with the following properties: 
     * @param {number} value number
     * 
     * @test Should Fail
     */
    imagePreprocessorSubtractValueMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            SubtractValue: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor MultitplyValue Malformed
     * 
     * ImagePreprocessor Preprocessing MultitplyValue step is of a type object with the following properties: 
     * @param {number} value number
     * 
     * @test Should Fail
     */
    imagePreprocessorMultitplyValueMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            MultitplyValue: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor DivideValue Malformed
     * 
     * ImagePreprocessor Preprocessing DivideValue step is of a type object with the following properties: 
     * @param {number} value number
     * 
     * @test Should Fail
     */
    imagePreprocessorDivideValueMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            DivideValue: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor ConvertToColor Malformed
     * 
     * ImagePreprocessor Preprocessing ConvertToColor step is of a type object with the following properties: 
     * @param {string} color Can only be 'RGB' or 'B+W'
     * 
     * @test Should Fail
     */
    imagePreprocessorConvertToColorMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            ConvertToColor: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor ConvertToColor Enum
     * 
     * ImagePreprocessor Preprocessing ConvertToColor step can only be "RGB" or "B+W"
     * 
     * @test Should Fail
     */
    imagePreprocessorConvertToColorRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            ConvertToColor: {
                                color: 'grayscale'
                            }
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor Resize Malformed
     * 
     * ImagePreprocessor Preprocessing Resize step is of a type object with the following properties: 
     * @param {array<number>} size Needs at least two number elements
     * @param {string} method Can only be 'bilinear', 'lanczos3', 'lanczos5', 'bicubic', 'gaussian', 'nearest', 'mitchellcubic'
     * @param {boolean} preserveAspectRatio boolean
     * @param {boolean} antialias boolean
     * 
     * @test Should Fail
     */
    imagePreprocessorResizeMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            Resize: {

                            }
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor Resize Requirements
     * 
     * ImagePreprocessor Preprocessing Resize step needs at least 2 elements of type number
     * 
     * @test Should Fail
     */
    imagePreprocessorResizeSizeRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            Resize: {
                                size: [123],
                                method: 'mitchellcubic',
                                preserveAspectRatio: true,
                                antialias: true
                            }
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Image Preprocessor Resize Method Requirements
     * 
     * ImagePreprocessor Preprocessing Resize step needs a 'method' property has to be one of the following options: 'bilinear', 'lanczos3', 'lanczos5', 'bicubic', 'gaussian', 'nearest', 'mitchellcubic'
     * 
     * @test Should Fail
     */
    imagePreprocessorResizeMethodRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    ImagePreprocessor: [
                        {
                            Resize: {
                                size: [123, 123],
                                method: 'randommethod',
                                preserveAspectRatio: true,
                                antialias: true
                            }
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Tabular Preprocessor Missing Properties
     * 
     * Test malformed TabularPreprocessor Preprocessing
     * 
     * @test Should Fail
     */
    tabularPreprocessorMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    TabularPreprocessor: [

                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Tabular Preprocessor AnyOf Requirement
     * 
     * TabularPreprocessor Preprocessing can only be one of the following steps:
     * @param ZScore
     * @param MinMax
     * @param OneHot
     * @param DropColumn
     * 
     * @test Should Fail
     */
    tabularPreprocessorAnyOfRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    TabularPreprocessor: [
                        {
                            RandomStep: {

                            }
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Tabular Preprocessor ZScore Malformed
     * 
     * TabularPreprocessor Preprocessing ZScore step is of a type object with the following properties:
     * @param {array<number>} means array of numbers
     * @param {array<number>} stds array of numbers
     * @param {array<integer>} columns integer
     * 
     * @test Should Fail
     */
    tabularPreprocessorZScoreMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    TabularPreprocessor: [
                        {
                            ZScore: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Tabular Preprocessor MinMax Malformed
     * 
     * TabularPreprocessor Preprocessing MinMax step is of a type object with the following properties:
     * @param {array<number>} mins array of numbers
     * @param {array<number>} maxs array of numbers
     * @param {array<integer>} columns integer
     *  
     * @test Should Fail
     */
    tabularPreprocessorMinMaxMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    TabularPreprocessor: [
                        {
                            MinMax: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Tabular Preprocessor OneHot Malformed
     * 
     * TabularPreprocessor Preprocessing OneHot step is of a type object with the following properties:
     * @param {integer} column
     * @param {array<number>} values
     * 
     * @test Should Fail
     */
    tabularPreprocessorOneHotMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    TabularPreprocessor: [
                        {
                            OneHot: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Tabular Preprocessor DropColumn Malformed
     * 
     * TabularPreprocessor Preprocessing DropColumn step is of a type object with the following properties:
     * @param {integer} column integer
     *  
     * @test Should Fail
     */
    tabularPreprocessorDropColumnMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [
                {
                    TabularPreprocessor: [
                        {
                            DropColumn: 100
                        }
                    ]
                }
            ],
            Postprocessing: []
        }
    },
    /**
     * Config JSON w/ Postprocessing steps only
     * 
     * This JSON includes a config with only postprocessing steps.
     * @test Should Pass
     */
    onlyPostprocessing: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    MulticlassClassification: {
                        labelMap: [
                            "cat",
                            "dog"
                        ]
                    }
                },
                {
                    BinaryClassification: {
                        labelMap: [
                            "cat",
                            "dog"
                        ],
                        threshold: 0.3
                    }
                },
                {
                    ObjectDetection: {
                        labelMap: [
                            "cat"
                        ],
                        threshold: 0.3
                    }
                },
                {
                    Regression: {
                        min: 1,
                        max: 2
                    }
                }
            ]
        }
    },
    /**
     * Preprocessing AnyOf Requirement
     * 
     * Preprocessing can only incluide any of the following objects:
     * @param BinaryClassification
     * @param MulticlassClassification
     * @param ObjectDetection
     * @param Regression
     * 
     * @test Should Fail
     */
    postprocessingAnyOfRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    RandomStep: {
                        labelMap: [
                            "cat",
                            "dog"
                        ]
                    }
                }
            ]
        }
    },
    /**
     * MulticlassClassification Missing Properties
     * 
     * Test malformed MulticlassClassification Postprocessing steps. MulticlassClassification has the following propertiens:
     * @param labelMap
     * 
     * @test Should Fail
     */
    multiclassMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    MulticlassClassification: {
                    }
                }
            ]
        }
    },
    /**
     * Multiclass Label Map Requirement:
     * 
     * MulticlassClassification labelMap property requires at least two elements.
     * 
     * @test Should Fail
     */
    multiclassLabelMapMissingElement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    MulticlassClassification: {
                        labelMap: [

                        ]
                    }
                }
            ]
        }
    },
    /**
     * Binary Classification Missing Properties:
     * 
     * Test malformed BinaryClassification Postprocessing steps.
     * 
     * @test Should Fail
     */
    binaryClassificationMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    BinaryClassification: {

                    }
                }
            ]
        }
    },
    /**
     * Binary Classification Label Map Requirement:
     * 
     * BinaryClassification labelMap property requires exactly two elements.
     * @test Should Fail
     */
    binaryLabelMapMissingElement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    BinaryClassification: {
                        labelMap: [
                            "cat"
                        ],
                        threshold: 0.5
                    }
                }
            ]
        }
    },
    /**
     * Binary Classification Threshold Range:
     * 
     * BinaryClassification threshold property value has to be between 0 and 1.
     * @test Should Fail
     */
    binaryThresholdRange: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    BinaryClassification: {
                        labelMap: [
                            "cat",
                            "dog"
                        ],
                        threshold: 300
                    }
                }
            ]
        }
    },
    /**
     * Object Detection Missing Properties:
     * 
     * Test malformed ObjectDetection Postprocessing steps.
     * @test Should Fail
     */
    objectDetectionMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    ObjectDetection: {

                    }
                }
            ]
        }
    },
    /**
     * Object Detection Label Map Requirement:
     * 
     * ObjectDetection labelMap property requires at least one element.
     * @test Should Fail
     */
    objectDetectionLabelMapMissingElement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    ObjectDetection: {
                        labelMap: [
                        ],
                        threshold: 0.5
                    }
                }
            ]
        }
    },
    /**
     * Object Detection Threshold Range:
     * 
     * ObjectDetection threshold property value has to be between 0 and 1.
     * @test Should Fail
     */
    objetDetectionThresholdRange: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    ObjectDetection: {
                        labelMap: [
                            "cat"
                        ],
                        threshold: 300
                    }
                }
            ]
        }
    },
    /**
     * Regression Missing Properties:
     * 
     * Test malformed Regression Postprocessing steps.
     * @test Should Fail
     */
    regressionMalformed: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    Regression: {

                    }
                }
            ]
        }
    },
    /**
     * Regression Min Requirement:
     * 
     * Regression min property is of type number and can be null.
     * @test Should Fail
     */
    regressionMinPropertyRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    Regression: {
                        min: "min",
                        max: 4
                    }
                }
            ]
        }
    },
    /**
     * Regression Max Requirement:
     * 
     * Regression max property is of type number and can be null.
     * @test Should Fail
     */
    regressionMaxPropertyRequirement: {
        ModelConfig: {
            URI: null,
            User: null,
            Token: null,
            Preprocessing: [],
            Postprocessing: [
                {
                    Regression: {
                        min: 4,
                        max: "max"
                    }
                }
            ]
        }
    }
}