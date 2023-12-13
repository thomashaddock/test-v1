/**
 * Class representing a HarvestedWebText.
 * @namespace HarvestedWebText
 */


/**
 * Class representing a HarvestedWebText.
 * @class HarvestedWebText
 * @classdesc The HarvestedWebText class is the base model class which will be extended by several other classes for task specific implementations.
 * */
export class HarvestedWebText {
    /**
     * HarvestedWebText object constructor.
     * @constructor
     * @param {!Object} data - Web text data.
     * @param {!String} url - Source url of the web text data.
     * @return {HarvestedWebText} HarvestedWebText object.
     */

    constructor(data, src){
        /** @member {Object} HarvestedWebImage.location - Web location object of datapoint. */
        this.location = window.location;
        /** @member {Object} HarvestedWebImage.id - ID of datapoint. */
        this.id = this.location.href;
        /** @member {Object} HarvestedWebImage.rawData - Web image data. */
        this.rawData = data;
        /** @member {Object} HarvestedWebImage.tensorData - Tensor containing web image data. */
        this.tensorData;
        /** @member {String} [type = text] HarvestedWebImage.type - Web image data type specifier. */
        this.type = 'text';
        /** @member {Object} HarvestedWebImage.predictions  - Collections of predictions made by NLP model with tensorData. */
        this.predictions = {};
    }
}

// module.exports.HarvestedWebText = HarvestedWebText;
