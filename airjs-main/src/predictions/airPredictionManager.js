import {ERROR_MESSAGES, HTTP_STATUS_CODES} from "../utils/constants";
import {ResponseError} from "../utils/errors";
const xxhash = require("xxhash-wasm");

export class airPredictionManager{
    constructor(db){
        this.db = db;
    }

    async createPrediction(modelId, prediction, rawData){
        //Not sure if there is a better way to do this
        const { h32} = await xxhash();
        let hashedDataPoint = h32(rawData, 0xABCD);
        try{
            let id = await this.db.predictions.put({prediction: prediction, modelId: modelId, createdAt: Date.now(),modifiedAt: Date.now(),  inputId:hashedDataPoint});
            return new Response(JSON.stringify({id}),{ "status": HTTP_STATUS_CODES.STATUS_200});
        }catch(e){
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.STATUS_500);
        }
    }

    async readPrediction(id){
        try {
            const prediction = await this.db.predictions.get(id);
            return new Response(JSON.stringify(prediction), { "status": HTTP_STATUS_CODES.STATUS_200})
        } catch(e){
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {id}, HTTP_STATUS_CODES.STATUS_500);
        }
    }

    async updatePrediction(id, prediction){
        try {
            await this.db.predictions.update(id, {'modifiedAt': Date.now(), prediction});
            return new Response(JSON.stringify(id), { "status": HTTP_STATUS_CODES.STATUS_200})
        } catch(e){
            throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {id}, HTTP_STATUS_CODES.STATUS_500);
        }

    }
    async deletePrediction(id){
        try {
            await this.db.predictions.where('id').equals(id).delete();
            return new Response(JSON.stringify({id}), { "status": HTTP_STATUS_CODES.STATUS_200})
        } catch(e){
        throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, {id}, HTTP_STATUS_CODES.STATUS_500);
    }

    }
    //TODO Refactor to remove if/else soup
    async listPredictions(modelId = undefined, url = undefined){
        if(modelId){
            if(url){
                //Querry for if prediction and keyword are present
                const predictions = await this.db.predictions.where(["modelId", "url"]).equals([modelId, url]).toArray();
                if(predictions.length > 0){
                    return new Response(JSON.stringify(predictions), { "status": HTTP_STATUS_CODES.STATUS_200});
                }
                else{
                    throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {predictions}, HTTP_STATUS_CODES.STATUS_404)
                }
            }
            //If keyword and no document
            else {
                try {
                    const predictions = await this.db.predictions.where("modelId").equals(modelId).toArray();
                    let a = 2;
                    if(predictions.length > 0){
                        return new Response(JSON.stringify(predictions), { "status": HTTP_STATUS_CODES.STATUS_200});
                    }
                    else{
                        throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {predictions}, HTTP_STATUS_CODES.STATUS_404)
                    }
                } catch(e) {

                }

            }
        }
        else {
            //If no keyword and no document
            if(url){

                const predictions = await this.db.predictions.where("url").equals(url).toArray();
                if(predictions.length > 0){
                    return new Response(JSON.stringify(predictions), { "status": HTTP_STATUS_CODES.STATUS_200});
                }
                else{
                    throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {predictions}, HTTP_STATUS_CODES.STATUS_404)
                }

            }
            else {
                //if no documents and no keywords
                const predictions = await this.db.predictions.toArray();
                if(predictions.length > 0){
                    return new Response(JSON.stringify(predictions), { "status": HTTP_STATUS_CODES.STATUS_200});
                }
                else{
                    throw new ResponseError(ERROR_MESSAGES.NOT_FOUND, {predictions}, HTTP_STATUS_CODES.STATUS_404)
                }


            }
        }
    }
}