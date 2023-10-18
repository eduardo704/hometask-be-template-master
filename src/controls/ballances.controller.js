const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { depostisUC } = require("../usecases/deposits/deposits.usecases");
const router = express.Router();

router.post('/deposit/:userId', getProfile, async (req, res) => {
    const profileId = Number(req.profile.id);

    const amount = Number(req.body.amount);

    const { userId } = req.params

    if (Number(userId) !== Number(profileId)) return res.status(403).end()
    if (isNaN(amount) && amount > 0) return res.status(400).json('Amount missing').end()

    const user = await depostisUC.depositForUser(userId, amount);

    if (user === 'Amount over max allowed') return res.status(400).json({ message: 'Amount over max allowed' }).end()

    res.json(user)
})

module.exports = router;