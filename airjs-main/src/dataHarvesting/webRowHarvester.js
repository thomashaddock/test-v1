const {ERROR_MESSAGES, HTTP_STATUS_CODES} = require("../utils/constants");
const WebDataHarvester = require('./webDataHarvester').WebDataHarvester;
const HarvestedWebRow = require('./harvestedWebImage').HarvestedWebRow;
const ResponseError = require('../utils/errors').ResponseError

/**
 * Class representing a WebRowHarvester.
 * @namespace WebRowHarvester
 */

/**
 * @constructor
 * @param {AIRDBManager} dbManager
 *
 */
function WebRowHarvester(dbManager){
    WebDataHarvester.apply(this, arguments)
};

WebRowHarvester.prototype = Object.create(WebDataHarvester.prototype);

WebRowHarvester.prototype.constructor = WebRowHarvester;

/**
 * Harvest data from DOM.
 * @param {DOM} dom - dom element to be harvested.
 * @return {@WebRowHarvester}
 */
WebRowHarvester.prototype.harvestFromDOM = function(dom) {
    throw new ResponseError(ERROR_MESSAGES.NOT_IMPLEMENTED, undefined, HTTP_STATUS_CODES.STATUS_500)
};

module.exports.WebRowHarvester = WebRowHarvester;
