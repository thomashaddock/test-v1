/**
 * Class representing a HarvestedWebImage.
 * @namespace HarvestedWebImage
 */


/**
 * Class representing a HarvestedWebImage.
 * @class HarvestedWebImage
 * @classdesc The HarvestedWebImage class is the base model class which will be extended by several other classes for task specific implementations.
 * */
export class HarvestedWebImage{
    /**
     * HarvestedWebImage object constructor.
     * @constructor
     * @param {!Object} data - Web image data.
     * @param {!String} src - Source url of the web image data.
     * @return {HarvestedWebImage} HarvestedWebImage object.
     */
    constructor(data, src){
        /** @member {Object} HarvestedWebImage.location - Web location object of datapoint. */
        this.location = window.location;
        /** @member {Object} HarvestedWebImage.id - ID of datapoint. */
        this.id = src;
        /** @member {Object} HarvestedWebImage.rawData - Web image data. */
        this.rawData = data;
        /** @member {Object} HarvestedWebImage.tensorData - Tensor containing web image data. */
        this.tensorData;
        /** @member {String} HarvestedWebImage.url - Source url of the web image data. */
        this.src = src;
        /** @member {String} [type = cv] HarvestedWebImage.type - Web image data type specifier. */
        this.type = 'cv';
        /** @member {Object} HarvestedWebImage.predictions  - Collections of predictions made by CV model with tensorData. */
        this.predictions = {};
        /** @member {String} HarvestedWebImage.predsOnBase64Image -  Web Image data with CV prediction data drawn over original web data. */
        this.predsOnBase64Image;
    }
}

// module.exports.HarvestedWebImage = HarvestedWebImage;
