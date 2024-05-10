const moment = require("moment-timezone");
const errorCode = require("../Response/errorCode");
const { GatewayException } = require("../Response/GatewayException");

function arrayHasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

function checkOrder(array) {
    const order = ["Coupon", "On Top", "Seasonal"];
    const indices = order.map(category => array.indexOf(category));
    for (let i = 0; i < indices.length - 1; i++) {
        if (indices[i] === -1 || indices[i + 1] === -1) {
            continue;
        }
        if (indices[i] >= indices[i + 1]) {
            return false;
        }
    }

    return true;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function exToResponse(ex) {
    var responseData = "";

    try {
        responseData = ex.toResponse();
    } catch {
        var err = new GatewayException(errorCode.internal_server_error, "", 500);
        responseData = err.toResponse();
    }

    const resTmp = JSON.parse(JSON.stringify(responseData));

    const response = {
        statusCode: resTmp.statusCode,
        headers: resTmp.headers,
        body: {
            status: {
                status_code: resTmp.body.status_code,
                message_th: resTmp.body.message_th,
                message_en: resTmp.body.message_en
            },
        },
    };

    return response;
}

function calTotalTime(startTime) {
    let endTime = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
    let duration = moment.duration(endTime.diff(startTime));
    let endSecTimer = duration.asSeconds();
    return endSecTimer;
}

module.exports = {
    arrayHasDuplicates,
    checkOrder,
    isEmpty,
    calTotalTime,
    exToResponse,
};
