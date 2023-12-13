const {HarvestedWebImage} = require('../dataHarvesting/harvestedWebImage');

module.exports.getCanvasFromImage = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height
    const ctx = canvas.getContext("2d");

    // ctx.fillStyle = 'green';
    ctx.drawImage(img, 0, 0, img.width, img.height)
    let fontsize = Math.max(img.width, img.height) * 0.045;
    let fontFace = 'verdana';
    let lineHeight = fontsize * 1.286;

    ctx.font = fontsize + 'px ' + fontFace;

    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.strokeStyle = '#00ff00';

    return {
        canvas,
        ctx,
        lineHeight
    }
}

module.exports.drawClassification = (img, preds) => {
    let canvasMeta = this.getCanvasFromImage(img)
    let text = preds[0].className + ' - ' + String(preds[0].probability).slice(0,4);
    let textWidth = canvasMeta.ctx.measureText(text).width;
    canvasMeta.ctx.fillStyle = '#00ff00';
    canvasMeta.ctx.fillRect(0, 0, textWidth, canvasMeta.lineHeight);
    canvasMeta.ctx.strokeStyle = '#00ff00';
    canvasMeta.ctx.lineWidth = Math.max(img.width, img.height) * 0.02
    canvasMeta.ctx.strokeRect(0, 0, canvasMeta.canvas.width, canvasMeta.canvas.height);
    canvasMeta.ctx.fillStyle = 'black';
    canvasMeta.ctx.fillText(text, 0, 0);
    return canvasMeta.canvas.toDataURL()
}

module.exports.drawObjectDetections = async (img, preds) => {
    let canvasMeta = this.getCanvasFromImage(img)
    await Promise.all(
        preds.map((pred) => {
            let text = pred.class + ' - ' + String(pred.score).slice(0,4);
            let textWidth = canvasMeta.ctx.measureText(text).width;
            canvasMeta.ctx.fillStyle = '#00ff00';
            canvasMeta.ctx.fillRect(pred.bbox[0], pred.bbox[1], textWidth, canvasMeta.lineHeight);
            canvasMeta.ctx.lineWidth = Math.max(img.width, img.height) * 0.02
            canvasMeta.ctx.fillStyle = 'black';
            canvasMeta.ctx.strokeRect(pred.bbox[0], pred.bbox[1], pred.bbox[2], pred.bbox[3]);
            canvasMeta.ctx.fillText(text, pred.bbox[0], pred.bbox[1]);
        })
    );
    return canvasMeta.canvas.toDataURL()
}

module.exports.loadFromURL = (url) => {
    return new Promise((resolve, reject) => {
        let imgElement = document.createElement('img');
        imgElement.crossOrigin = "anonymous";
        imgElement.onload = (e) => {
            if((imgElement.height && imgElement.height > 100) || (imgElement.width && imgElement.width > 100)){
                resolve(imgElement); // todo use multiple classes of harvested data points for each type of datapoint
            }
            else {
                resolve(null);
            }
        }
        imgElement.onerror = (e) => {
            reject(e);
        };
        imgElement.src = url;
    });
};

module.exports. drawSemanticSegmentations = (img, preds) => {
    return
}
