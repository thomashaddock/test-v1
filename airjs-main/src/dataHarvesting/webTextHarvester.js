const { Readability } = require('@mozilla/readability')
const WebDataHarvester = require('./webDataHarvester').WebDataHarvester;
const HarvestedWebText = require('./harvestedWebText').HarvestedWebText;

/**
 * Class representing a WebTextHarvester.
 * @namespace WebTextHarvester
 */

/**
 * @constructor
 * @param {AIRDBManager} dbManager
 *
 */
function WebTextHarvester(dbManager){
    WebDataHarvester.apply(this, arguments)
};

WebTextHarvester.prototype = Object.create(WebDataHarvester.prototype);

WebTextHarvester.prototype.constructor = WebTextHarvester;

/**
 * Harvest text data from DOM.
 * @return {@WebTextHarvester}
 */
WebTextHarvester.prototype.harvestFromDOM = function() {
    const documentClone = document.cloneNode(true);
    const harvestedText = new Readability(documentClone).parse();
    if (harvestedText && harvestedText.textContent) {
        return new HarvestedWebText(harvestedText, window.location.href)
    }
};

module.exports.WebTextHarvester = WebTextHarvester;