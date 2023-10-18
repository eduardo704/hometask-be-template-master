const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { jobUC } = require("../usecases/jobs/jobs.usecases");
const router = express.Router();

router.get('/unpaid', getProfile, async (req, res) => {
    const userId = Number(req.profile.id);

    const jobs = await jobUC.getUnpaidForUser(userId)
    if (!jobs) return res.status(404).end()
    res.json(jobs)
})

router.post('/:job_id/pay', getProfile, async (req, res) => {
    const userId = Number(req.profile.id);
    const { job_id } = req.params

    const result = await jobUC.pay(job_id, userId);

    if (result === 'Not Found') {
        return res.status(404).json({ message: 'Could not find unpaid job for userId' }).end()
    }
    if (result === 'Not enough balance') {
        return res.status(400).json({ message: 'Insuficient balance' }).end()
    }

    res.json(result)
})

module.exports = router;