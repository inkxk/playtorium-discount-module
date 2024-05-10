const errorCode = require("../Response/errorCode");
const { GatewayException } = require("../Response/GatewayException");

async function calculateDiscountService(items, discountList) {
    try {
        let normalPrice = 0;
        let finalPrice = 0;

        for (item of items) {
            normalPrice += item.price
        }

        for (discount of discountList) {
            if (discount.campaign_name === "Fixed amount") {
                let discountValue = discount.campaign_parameter
                finalPrice = normalPrice - discountValue;
            } else if (discount.campaign_name === "Percentage discount") {
                let discountValue = normalPrice * (discount.campaign_parameter / 100)
                finalPrice = normalPrice - discountValue;
            } else if (discount.campaign_name === "Percentage discount by item category") {
                let matchedItems = items.filter(item => item.item_category == discount.campaign_parameter[0]).map(item => item.price);
                let matchedItemsPrice = matchedItems.reduce((partialSum, a) => partialSum + a, 0);
                let discountValue = matchedItemsPrice * (discount.campaign_parameter[1] / 100)
                finalPrice = finalPrice - discountValue;
            } else if (discount.campaign_name === "Discount by points") {
                let discountValue = discount.campaign_parameter;
                let maxDiscount = (20 / 100) *  finalPrice;
                if (discountValue > maxDiscount) {
                    discountValue = maxDiscount;
                }
                finalPrice = finalPrice - discountValue;
            } else if (discount.campaign_name === "Special campaigns") {
                let discountValue = (Math.floor((finalPrice / discount.campaign_parameter[0])) * discount.campaign_parameter[1]);
                finalPrice = finalPrice - discountValue;
            }
        }

        return finalPrice
    } catch(err) {
        console.error("error calculateDiscountService:", err);
        throw new GatewayException(errorCode.internal_server_error, "", 500);
    }
}

module.exports = {
    calculateDiscountService
}