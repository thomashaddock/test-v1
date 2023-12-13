const WebTextHarvester = require('./dataHarvesting/webTextHarvester').WebTextHarvester;
const WebImageHarvester = require('./dataHarvesting/webImageHarvester').WebImageHarvester;
const DOMTextDecorator = require('./domDecorators/domTextDecorator').DOMTextDecorator;
const DOMImageDecorator = require('./domDecorators/domImageDecorator').DOMImageDecorator;
const AIRDBManager = require('./db/airDBManager').AIRDBManager;
const AIRModelManager = require('./models/airModelManager').AIRModelManager;
const AIRPredictionManager = require("./predictions/airPredictionManager").airPredictionManager;

module.exports.WebTextHarvester = WebTextHarvester;
module.exports.WebImageHarvester = WebImageHarvester;
module.exports.DOMTextDecorator = DOMTextDecorator;
module.exports.DOMImageDecorator = DOMImageDecorator;
module.exports.AIRDBManager = AIRDBManager;
module.exports.AIRModelManager = AIRModelManager;
module.exports.AIRPredictionManager = AIRPredictionManager;
