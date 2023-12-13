const $ = require( "jquery" );

class DOMTextDecorator {
    constructor(){
        // this.currentKeywords = []
        this.currentDataPoint;

        this.observer = new MutationObserver(async mutations => {
            let addedNodes = []
            addedNodes = await Promise.all(mutations.map(async (mutation) => {
                if (mutation.attributeName === 'style' || mutation.addedNodes.length > 0) {
                    return true
                }
            }))
            if (addedNodes.length > 0) {
                await this.removeDOMDecorations();
                await this.decorateDOM(this.currentDataPoint)
            }
        });
    }

    async decorateDOM(harvestedDataPoint, template){
        // this.currentKeywords = keywords;
        this.observer.disconnect()
        this.currentDataPoint = harvestedDataPoint
        const keywords = harvestedDataPoint.predictions[0].keywords.length > 0 ?
            harvestedDataPoint.predictions[0].keywords : [harvestedDataPoint.predictions[0].className]
        await Promise.all(
            keywords.map(
                async (keyword, i) => {
                    this.decorateMatchingText(keyword, i < 3 ?? true)
                }
            )
        )
        this.observer.observe(document, { childList: true, subtree: true, attributes: true });
    }

    decorateMatchingText(keyword, isTopKeyword = false){
        //todo  if key words is in top keywords it should be starred
        const escapedKeyword = keyword.replace(/[.*+?^$@%{}()|[\]\\]/g, '\\$&');
        let addUnderlineRegex = new RegExp(escapedKeyword)
        $('.' + escapedKeyword).replaceWith(keyword)
        const templateClass = escapedKeyword.replace(/ /g, "-");
        let htmlTemplate = '';
        if(isTopKeyword){
            htmlTemplate = '<u class=\'' + templateClass + '\' style=\'text-decoration: underline wavy #2a38fb;cursor: pointer;\'>' + escapedKeyword + '&#11088;</u>'
        }
        else{
            htmlTemplate = '<u class=\'' + templateClass + '\' style=\'text-decoration: underline wavy #2a38fb;cursor: pointer;\'>' + escapedKeyword + '</u>'

        }
        let xpath = ".//*[contains(text(),'" + escapedKeyword + "')]";
        let matchingEl = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        let snapshot;
        for (let i = 0; i < matchingEl.snapshotLength; i++) {
            snapshot = matchingEl.snapshotItem(i)
            if(snapshot.nodeName == 'TEXTAREA'){
                // Create a new element and assign it attributes from the current element
                let div = $("<div />");
                $.each(snapshot.attributes, function(i, attribute){
                    $(div).attr(attribute.name, attribute.value);
                });
                $(div).attr('contenteditable', 'true');
                $(div).css('white-space', 'pre-wrap')
                $(div).addClass('wasTextArea');

                // Replace the current element with the new one and carry over the contents
                $(snapshot).replaceWith(function () {
                    return $(div).append($(snapshot).contents());
                });
            }
        }

        matchingEl = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        // for (let i = matchingEl.snapshotLength - 1; i >= 0; i--) {
        //     snapshot = matchingEl.snapshotItem(i)
        //     if(snapshot.nodeName !== 'SCRIPT'){
        //         snapshot.innerHTML = snapshot.innerHTML.replaceAll(keyword, htmlTemplate)
        //     }
        // }

        for (let i = 0; i < matchingEl.snapshotLength; i++) {
            snapshot = matchingEl.snapshotItem(i)
            if(snapshot.nodeName !== 'SCRIPT'){
                snapshot.innerHTML = snapshot.innerHTML.replaceAll(keyword, htmlTemplate)
            }
        }
        // xpath = "//iframe[contains(@title, 'details')]";
        // matchingEl = document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        // let iframe = matchingEl.snapshotItem(0);
        // xpath = ".//*[contains(text(),'" + escapedCategory + "')]";
        // if(iframe){
        //     matchingEl = document.evaluate(xpath, iframe.contentDocument.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        //     for (let i = 0; i < matchingEl.snapshotLength; i++) {
        //         snapshot = matchingEl.snapshotItem(i)
        //         if(snapshot.nodeName !== 'SCRIPT'){
        //             snapshot.innerHTML = snapshot.innerHTML.replaceAll(keyword, htmlTemplate)
        //         }
        //     }
        // }

        let iframes = document.getElementsByTagName("iframe")
        for(let iframe of iframes) {
            matchingEl = document.evaluate(xpath, iframe.contentDocument.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (let i = 0; i < matchingEl.snapshotLength; i++) {
                snapshot = matchingEl.snapshotItem(i)
                if(snapshot.nodeName !== 'SCRIPT'){
                    snapshot.innerHTML = snapshot.innerHTML.replaceAll(keyword, htmlTemplate)
                }
                // snapshot.innerHTML = snapshot.innerHTML.replaceAll(keyword, htmlTemplate)
            }
        }
    }

    async removeDOMDecorations(){
        const keywords = this.currentDataPoint.predictions[0].keywords.length > 0 ?
            this.currentDataPoint.predictions[0].keywords : [this.currentDataPoint.predictions[0].className]
        this.observer.disconnect()
        await Promise.all(
            keywords.map(
                async keyword => {
                    const escapedKeyword = keyword.replace(/[.*+?^$@%{}()|[\]\\]/g, '\\$&');
                    const templateClass = escapedKeyword.replace(/ /g,"-");
                    $('.' + templateClass).off( "click", "**" );
                    let underlinedTags = $('.' + escapedKeyword);
                    let parentTags = [];
                    $.each(underlinedTags, function(i, tag){
                        parentTags.push($(tag).parent()[0])
                    })
                    underlinedTags.replaceWith(keyword)
                    underlinedTags = $('[title=" details"]').contents().find('.' + escapedKeyword)
                    underlinedTags.replaceWith(keyword)
                    $.each(parentTags, function(i, tag){
                        const tagSelection = $(tag)
                        if(tagSelection.length > 0){
                            tagSelection[0].innerHTML = tagSelection[0].innerHTML
                        }
                    })
                }
            )
        )
        const textAreas = $('.wasTextArea');
        if(textAreas.length > 0){
            $.each(textAreas, function(i, textArea){
                textArea.innerHTML = textArea.innerHTML;
            })
        }
    }
}

module.exports.DOMTextDecorator = DOMTextDecorator;