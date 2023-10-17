const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model')
const { getProfile } = require('./middleware/getProfile');
const { contractUC } = require('./usecases/contracts/contracts.usecases');
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
    const { Contract } = req.app.get('models')
    const headerProfile = req.profile;
    const { id } = req.params



    if (headerProfile.id !== Number(id)) return res.status(403).end()

    const contract = await Contract.findOne({ where: { id } })
    if (!contract) return res.status(404).end()
    res.json(req.profile)
})
module.exports = app;
