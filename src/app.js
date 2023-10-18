const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile');
const { contractUC } = require('./usecases/contracts/contracts.usecases');
const { jobUC } = require('./usecases/jobs/jobs.usecases');
const { depostisUC } = require('./usecases/deposits/deposits.usecases');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
    const headerProfile = req.profile;
    const { id } = req.params

    if (headerProfile.id !== Number(id)) return res.status(403).end()

    const contract = await contractUC.getContractById(id)
    if (!contract) return res.status(404).end()
    res.json(req.profile)
})

app.get('/contracts', getProfile, async (req, res) => {
    const userId = Number(req.profile.id);

    const contract = await contractUC.getContractCurrentUser(userId)
    if (!contract) return res.status(404).end()
    res.json(contract)
})

app.get('/jobs/unpaid', getProfile, async (req, res) => {
    const userId = Number(req.profile.id);

    const jobs = await jobUC.getUnpaidForUser(userId)
    if (!jobs) return res.status(404).end()
    res.json(jobs)
})
app.post('/jobs/:job_id/pay', getProfile, async (req, res) => {
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
app.post('/balances/deposit/:userId', getProfile, async (req, res) => {
    const profileId = Number(req.profile.id);

    const amount = Number(req.body.amount);

    const { userId } = req.params

    console.log()


    if (Number(userId) !== Number(profileId)) return res.status(403).end()
    if (isNaN(amount) && amount > 0) return res.status(400).json('Amount missing').end()


    const user = await depostisUC.depositForUser(userId, amount);


    if (user === 'Amount over max allowed') return res.status(400).json({ message: 'Amount over max allowed' }).end()

    res.json(user)
})

module.exports = app;
