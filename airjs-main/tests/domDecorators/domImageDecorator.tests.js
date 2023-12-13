const {DOMImageDecorator} = require("../../src/domDecorators/domImageDecorator");


describe("domImageDecorator Tests", ()=>{


    it('should decorate dom', async ()=>{
        let res2 = await (await fetch('/base/tests/utils/static/domImage.html')).text();
        let p = new DOMParser();
        let newDom = p.parseFromString(res2, "text/html");
        let temp = document.createElement(null);
        temp.innerHTML = newDom.body.innerHTML;
        // Document Body setup
        document.body.appendChild(temp);
        //TODO Do tests here
        let td = new DOMImageDecorator();
        // Document Body teardown
        document.body.removeChild(temp);

    })

})