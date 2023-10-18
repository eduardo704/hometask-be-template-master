const express = require("express");
const { adminUC } = require("../usecases/admin/admin.usecases");
const router = express.Router();
const { DateTime } = require("luxon");

router.get('/best-profession', async (req, res) => {
    const { start, end } = req.query;

    const startDate = DateTime.fromFormat(start, "dd-MM-yyyy");
    const endDate = DateTime.fromFormat(end, "dd-MM-yyyy");

    const user = await adminUC.professionMadeMoreMoneyForTime(startDate.toJSDate(), endDate.toJSDate());


    res.json(user)
})

router.get('/best-clients', async (req, res) => {
    const { start, end, limit } = req.query;

    const startDate = DateTime.fromFormat(start, "dd-MM-yyyy");
    const endDate = DateTime.fromFormat(end, "dd-MM-yyyy");

    const user = await adminUC.bestCustomers(startDate.toJSDate(), endDate.toJSDate(), limit);

    res.json(user)
})

module.exports = router;