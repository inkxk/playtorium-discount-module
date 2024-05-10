const common = require("../Utilities/common");
const { discountModel } = require("../Utilities/model");
const errorCode = require("../Response/errorCode");
const { GatewayException } = require("../Response/GatewayException");

function mappingRequestBody(body) {
    let requestModel = JSON.parse(JSON.stringify({}));
    requestModel.items = body.items;
    requestModel.discount = body.discount;
    return requestModel;        
};

function validateRequestBody(request) {
    // format body object
    try {
        var requestBody = mappingRequestBody(request)
    } catch(err) {
        throw new GatewayException(errorCode.invalid_data, "Invalid request body format", 400);
    }

    // check body is empty?
    if (common.isEmpty(requestBody)) {
        throw new GatewayException(errorCode.invalid_data, "Invalid. No request", 400);
    }
    
    // validate items
    if (requestBody.items.length <= 0) {
        throw new GatewayException(errorCode.invalid_data, "items is invalid", 400);
    }

    for (item of requestBody.items) {
        if (!Object.hasOwn(item, "item_name") || !Object.hasOwn(item, "item_category") || !Object.hasOwn(item, "price")) {
            throw new GatewayException(errorCode.invalid_data, "items is invalid", 400);
        }
    }

    // validate discount
    if (requestBody.discount.length <= 0 || requestBody.discount.length > 3) {
        throw new GatewayException(errorCode.invalid_data, "discount is invalid", 400);
    }

    const campaignCategoryArray = [];
    for (discount of requestBody.discount) {
        if (!Object.hasOwn(discount, "campaign_name") || !Object.hasOwn(discount, "campaign_parameter")) {
            throw new GatewayException(errorCode.invalid_data, "discount is invalid", 400);
        }

        const twoParameterCampaign = ["Percentage discount by item category", "Special campaigns"];
        if (twoParameterCampaign.includes(discount.campaign_name) && discount.campaign_parameter.length !== 2) {
            throw new GatewayException(errorCode.invalid_data, "discount is invalid", 400);
        }

        try {
            const correspondingItem = discountModel.find(model => model.Campaign === discount.campaign_name);
            campaignCategoryArray.push(correspondingItem.Category);
        } catch(err) {
            throw new GatewayException(errorCode.invalid_data, "campaign_name is invalid", 400);
        }
        
    }

    if (common.arrayHasDuplicates(campaignCategoryArray) || !common.checkOrder(campaignCategoryArray)) {
        throw new GatewayException(errorCode.invalid_data, "discount is invalid", 400);
    }
    
    return requestBody;
}

module.exports = {
    validateRequestBody,
};
