const ResponseError = require('../utils/errors').ResponseError
const {ERROR_MESSAGES, HTTP_STATUS_CODES} = require("../utils/constants");

/**
 * WebDataHarvester
 * @class WebDataHarvester
 */

/**
 * Class representing a WebDataHarvester.
 * @namespace WebDataHarvester
 */

/**
 * WebDataHarvester object constructor.
 * @constructor
 */
function WebDataHarvester() {
    /** @member {Object} WebDataHarvester.networkRequest -
     *  @Todo locally persist customized html tags; maybe within networkRequests ^
     */
    this.networkRequests = {};
    // this.harvestedElements = [] // todo locally persist customized html tags; maybe within networkRequests ^
}

/**
 * Load from url method.
 * @param {String} url -
 * @Todo implement
 */
WebDataHarvester.prototype.loadFromURL = function(url) {
    throw new ResponseError(ERROR_MESSAGES.NOT_IMPLEMENTED, undefined, HTTP_STATUS_CODES.STATUS_500)
}

/**
 * Harvest from DOM method.
 * @param {String} dom -
 * @Todo implement
 */
WebDataHarvester.prototype.harvestFromDOM = function(dom) {
    throw new ResponseError(ERROR_MESSAGES.NOT_IMPLEMENTED, undefined, HTTP_STATUS_CODES.STATUS_500)
};

/**
 * Initialize passive harvesting.
 * @param {} onReqHarvested -
 * @param {String[]} urls - List of urls to be processed.
 * @param {} dataTypes -
 * @todo complete documentation
 * */
WebDataHarvester.prototype.startPassiveHarvest = function(onReqHarvested, urls, dataTypes){
    try{
        let options = {};
        if(urls && urls.length > 0) options.urls = urls;
        if(dataTypes && dataTypes.length > 0) options.types = dataTypes;

        chrome.webRequest.onCompleted.addListener(async req => {
            if (req && req.tabId > 0) {
                if(!this.networkRequests[req.url]){
                    const payload = await this.loadFromURL(req.url)
                    if(payload){
                        this.networkRequests[req.url] = req;
                        this.networkRequests[req.url].harvestedWebDataPoint = payload
                    }
                }
                onReqHarvested(this.networkRequests[req.url])
            }
        }, options);
    }
    catch(e){
        throw 'error passively harvesting data from:\n' + req.url
    }

}

/**
 * Stop passive harvest
 * @todo stop specific listener associated to previously started harvest
 */
WebDataHarvester.prototype.stopPassiveHarvest = function() {
    // todo stop specific listener associated to previously started harvest
    return
}

/**
 * Start active harvest
 * @todo todo active harvest by sending html tags, attributes, text content in control signal to content will be coupled with a message-passing module with it's counterpart for the content.js script
 */
WebDataHarvester.prototype.startActiveHarvest = function() {
    // todo active harvest by sending html tags, attributes, text content in control signal to content
    //  will be coupled with a message-passing module with it's counterpart for the content.js script
    return
}

/**
 * Stop active harvest
 * @todo stop specific listener associated harvester
 */
WebDataHarvester.prototype.stopActiveHarvest = function() {
    return
}

/**
 * Start active harvest stream
 * @todo stop specific listener associated harvester
 */
WebDataHarvester.prototype.startActiveHarvestStream = function() {
    // todo use mutation observers for never-ending active harvest by html tags, attributes, text content
    //  will be coupled with a message-passing module with it's counterpart for the content.js script
    return
}

/**
 * Stop active harvest stream
 * @todo stop specific listener associated harvester
 */
WebDataHarvester.prototype.stopActiveHarvestStream = function() {
    return
}

module.exports.WebDataHarvester = WebDataHarvester;
