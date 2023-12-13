const airjs = require("../../src/air");
const {generateDBName} = require("../utils/dbNameGenerator");
const {logUsage} = require("../../src/utils/usageMetrics");
const {actions} = require("../../src/utils/constants");
describe('Usage Metrics Tests', () => {
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

    it("should log a read action", async () => {
        let modelId = 2;
        let res = await (await logUsage(actions.READ, {modelId}, undefined, modelManager.db)).json();
        expect(res.action).toBe(actions.READ);
    })

    it("should log a create action", async () => {
        let modelId = 2;
        let config = {name: "modelo1", description: "modelazo"};
        let res = await (await logUsage(actions.CREATE, {modelId, config}, undefined, modelManager.db)).json();
        expect(res.action).toBe(actions.CREATE);
    })

    it("should log a update action", async () => {
        let modelId = 2;
        let config = {name: "modelo1", description: "modelazo"};
        let res = await (await logUsage(actions.UPDATE, {modelId, config}, undefined, modelManager.db)).json();
        expect(res.action).toBe(actions.UPDATE);
    })
});