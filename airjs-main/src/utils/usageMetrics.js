const {ResponseError} = require("../utils/errors");
const {ERROR_MESSAGES, HTTP_STATUS_CODES} = require("../utils/constants");

async function logUsage(action, data, userId= undefined, db){
    const record = {userId: userId, action:action, data:data, timeStamp:  Date.now()};
    try{
        await db.usageMetrics.put(record);
        return new Response(JSON.stringify({action}),{ "status": HTTP_STATUS_CODES.STATUS_200});
    } catch(e){
        throw new ResponseError(ERROR_MESSAGES.UNEXPECTED_ERROR, HTTP_STATUS_CODES.STATUS_500);
    }
}

module.exports = {logUsage};