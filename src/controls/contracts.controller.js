const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { contractUC } = require("../usecases/contracts/contracts.usecases");
const router = express.Router();

router.get('/all', getProfile, async (req, res) => {

    const contract = await contractUC.getAll()
    if (!contract) return res.status(404).end()
    res.json(contract)
})

/**
 * FIX ME!
 * @returns contract by id
 */
router.get('/:id', getProfile, async (req, res) => {
    const headerProfile = req.profile;
    const { id } = req.params

    if (headerProfile.id !== Number(id)) return res.status(403).end()

    const contract = await contractUC.getContractById(id)
    if (!contract) return res.status(404).end()
    res.json(req.profile)
})

router.get('', getProfile, async (req, res) => {
    const userId = Number(req.profile.id);

    const contract = await contractUC.getContractCurrentUser(userId)
    if (!contract) return res.status(404).end()
    res.json(contract)
})

module.exports = router;