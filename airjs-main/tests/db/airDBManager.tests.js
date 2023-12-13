
// const airjs = require('airjs');
const {ResponseError} = require("../../src/utils/errors");
// const chrome = require('sinon-chrome');
const airjs = require('../../src/air');
const {generateDBName} = require('../utils/dbNameGenerator');
describe('DB Manager Tests', () =>{
    let dbManager;
    let modelManager;

    beforeEach(async () => {
        dbManager = new airjs.AIRDBManager(generateDBName(5));
        await dbManager.init();
        modelManager = new airjs.AIRModelManager(dbManager.db)
    })

    afterEach(async () => {
        await dbManager.db.close();
        await dbManager.db.delete();
    })

    it("should have 1 initial models saved in database", async () => {
        try{

            let res = await (await modelManager.listModels()).json();
            expect(res.length).toBe(1);


        }catch(e){
            console.log(e)
            console.log("aqui")
            // console.log(e.response.status)
            // console.log(await e.response.json())
        }
    })
});



