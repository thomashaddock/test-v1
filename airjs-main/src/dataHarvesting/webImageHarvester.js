const WebDataHarvester = require('./webDataHarvester').WebDataHarvester;
const HarvestedWebImage = require('./harvestedWebImage').HarvestedWebImage;

/**
 * Class representing a WebImageHarvester.
 * @namespace WebImageHarvester
 */

/**
 * @constructor
 * @param {AIRDBManager} dbManager
 *
 */
function WebImageHarvester(dbManager){
    WebDataHarvester.apply(this, arguments)
};

WebImageHarvester.prototype = Object.create(WebDataHarvester.prototype);

WebImageHarvester.prototype.constructor = WebImageHarvester;

WebImageHarvester.prototype.harvestFromDOM = async function() {
    const dataPoints = await Promise.all([...document.images].map(async (image) => {
        if (image.nodeName === "IMG") {
            return new HarvestedWebImage(undefined, image.getAttribute("orig-url") || image.src);
        }
        else {
            return false;
        }
    })).then((dataPoints) => dataPoints.filter((dataPoint) => dataPoint));

    return dataPoints;
};

/**
 * Load from url method.
 * @param {String} url - url referring to image element to be harvested.
 * @return {@HarvestedWebImage}
 */
WebImageHarvester.prototype.loadFromURL = function(url) {
    return new Promise((resolve, reject) => {
        let imgElement = document.createElement('img');
        imgElement.crossOrigin = "anonymous";
        imgElement.src = url;
        imgElement.onload = (e) => {
            if((imgElement.height && imgElement.height > 100) || (imgElement.width && imgElement.width > 100)){
                resolve(new HarvestedWebImage(imgElement, url)); // todo use multiple classes of harvested data points for each type of datapoint
            }
            else {
                resolve(null);
            }
        }
        imgElement.onerror = (e) => {
            reject(e);
        };
    });
};

WebImageHarvester.prototype.startPassiveHarvest = function(onReqHarvested, urls, dataTypes) {
    WebDataHarvester.prototype.startPassiveHarvest.call(this, onReqHarvested, urls, ["image", "object"]);
};

module.exports.WebImageHarvester = WebImageHarvester;
