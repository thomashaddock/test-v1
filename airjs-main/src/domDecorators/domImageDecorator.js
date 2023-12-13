const $ = require( "jquery" );

class DOMImageDecorator {
    constructor(){

    }

    async decorateDOM(preds){
        // todo refactor to support decorating "documents" instead of words within a document
        await Promise.all(
            preds.map(
                async (pred, i) => {
                    this.decorateMatchingImage(pred)
                }
            )
        )
    }

    decorateMatchingImage(pred){
        if (pred && pred.src) {
            const origUrlSelector = '[orig-url="' + pred.src + '"]';
            let srcImage = document.querySelector(origUrlSelector)

            if (srcImage) {
                srcImage.src = pred.predsOnBase64Image;
                srcImage.setAttribute("srcset", "");
            } else {
                const srcSelector = 'img[src="' + pred.src + '"]';
                const srcSetSelector = 'img[srcset*="' + pred.src + '"]';
                const urlSelectorWOProtocol = pred.src.split(window.location.protocol)[1]
                const srcSelectorWOProtocol = 'img[src="' + urlSelectorWOProtocol + '"]';
                const srcSetSelectorWOProtocol = 'img[srcset*="' + urlSelectorWOProtocol + '"]';
                srcImage = document.querySelector(srcSelector) || document.querySelector(srcSetSelector) || document.querySelector(srcSelectorWOProtocol) || document.querySelector(srcSetSelectorWOProtocol);
                if (srcImage) {
                    srcImage.src = pred.predsOnBase64Image;
                    srcImage.setAttribute("srcset", "");
                    srcImage.setAttribute("orig-url", pred.src);

                    let wrapper = document.createElement("div")
                    wrapper.style.position = "relative"

                    wrapper.appendChild(srcImage.cloneNode(true))

                    srcImage.replaceWith(wrapper);
                }
            }
        }
    }

    async removeDOMDecorations(preds){
        await Promise.all(
            Object.keys(preds).map(
                async (predURL, i) => {
                    if(preds[predURL].predsOnBase64Image){
                        preds[predURL].predsOnBase64Image = predURL;
                        this.decorateMatchingImage(preds[predURL])
                    }
                }
            )
        )
    }
}

module.exports.DOMImageDecorator = DOMImageDecorator;