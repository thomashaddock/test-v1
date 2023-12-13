require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const cocoSSD = require('@tensorflow-models/coco-ssd');
const deeplab = require('@tensorflow-models/deeplab');

/**
 * Seed the browser's IndexedDB with the base model ids.
 * @param {Object} db - DB connection object.
 * @return {Object} List of modelIds from base models.
 * @todo insert predictions for tests
 */
const seedDefaultModels = async (db) => {
    const models = await db.models.toArray();
    if(models.length == 0){
        const modelIds = await db.models.bulkPut([
            {
                name: 'mobileNetDefault',
                version: '1.0',
                task: 'classification',
                type: 'cv',
                description: "MobileNet trained on ImageNet",
            },
            // {
            //     name: 'cocoSSDDefault',
            //     version: '1.0',
            //     task: 'objectDetection',
            //     type: 'cv',
            //     description: "SSD trained on COCO",
            // },
            // {
            //     name: 'deepLabDefault',
            //     version: '1.0',
            //     task: 'semanticSegmentation',
            //     type: 'cv',
            //     description: "DeepLab v3 trained on Pascal VOC",
            // }
        ], {allKeys: true})
    
        let model = await mobilenet.load();
        await model.model.save('indexeddb://' + modelIds[0]);
        // model = await cocoSSD.load();
        // await model.model.save('indexeddb://' + modelIds[1]);
        // model = await deeplab.load();
        // await model.model.save('indexeddb://' + modelIds[2]);

        //todo insert predictions for tests
    
        return modelIds;
    }
}

module.exports.developmentSeed = async (db) => {
    return await seedDefaultModels(db);
}

