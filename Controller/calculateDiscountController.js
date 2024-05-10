const moment = require("moment-timezone");

const common = require("../Utilities/common");
const { validateRequestBody } = require('../Service/validateService');
const { calculateDiscountService } = require('../Service/calculateDiscountService');
const { GatewayException } = require("../Response/GatewayException");
const errorCode = require("../Response/errorCode");

moment.tz.setDefault("Asia/Bangkok");

async function calculateDiscount(req) {
    const startTimeProgram = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var responseObj = {};
    try {
        console.log("requestBody:", JSON.stringify(req.body));

        // check request body
        var requestBody = validateRequestBody(req.body);

        // calculate discount
        const totalPrice = await calculateDiscountService(requestBody.items, requestBody.discount);

        // Response
        responseObj = {
            statusCode: 200,
            body: {
                status: errorCode.success,
                data: {
                    "Total Price": totalPrice
                }
            }
        };

        console.log("responseData:", JSON.stringify(responseObj));
        return responseObj;
    } catch (ex) {
        console.log(ex);
        responseObj = common.exToResponse(ex);
        console.log("Response Error:", JSON.stringify(responseObj));

        return responseObj;
    } finally {        
        console.log("==== Total Time Process ====: ", common.calTotalTime(startTimeProgram), " secs");
    }
}

module.exports = {
    calculateDiscount,
};
