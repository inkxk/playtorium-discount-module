const express = require("express");
const { calculateDiscount } = require("../Controller/calculateDiscountController");

const router = express.Router();

router.post("/discount-module", async (req, res) => {
    let returnData = await calculateDiscount(req);
    let response = {
        ...returnData
    };
    res.status(response.statusCode).send(response.body);
})

module.exports = router;
