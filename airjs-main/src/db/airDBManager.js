const Dexie = require("dexie").Dexie;
const seeds = require('./seeds')
const { MODES, DB_NAMES, env } = require('../utils/constants')

/**
 * Class representing an AIRDBManager.
 * @class AIRDBManager
 * @classdesc The AIRDBManager class is in charge of handling interactions with the browser's IndexedDB.
 * @public
 * */
export class AIRDBManager{

    /**
     * AIRDBManager object constructor.
     * @constructor
     * @memberOf AIRDBManager
     * @return {AIRDBManager} AirDBManager object with an active DB connection.
     */
    constructor(databaseName = undefined){
        let dbName;
        if (databaseName !== undefined) {
            dbName = databaseName;
        }
        else if(env.mode == MODES.DEVELOPMENT){
            dbName = DB_NAMES.DEVELOPMENT
        }
        else if(env.mode == MODES.QA){
            dbName = DB_NAMES.QA
        }
        else{
            dbName = DB_NAMES.PRODUCTION
        }

        /** @member {Object} AIRDBManager.db - Dexie.js connection to IndexedDB. */
        this.db = new Dexie(dbName);
        this.db.version(1).stores({
            models: "++id,config.modelConfig.name,config.modelConfig.version,config.modelConfig.description,config.modelConfig.uri,selected",
            modelFiles: "id",
            usageMetrics: "action, data",
            predictions: "++id, modelId, prediction, url, [modelId+url], inputId"
        });
    }

    /**
     * Initialize IndexedDB from development seed.
     */
    async init(){
        return await seeds.developmentSeed(this.db)
    }
}

// module.exports.AIRDBManager = AIRDBManager;