const { contractsDB } = require("../../db/contracts/contract.db");


async function getContractById(id) {
    return await contractsDB.getContractById(id)
}
async function getAll() {
    return await contractsDB.getAllContracts()
}
async function getContractCurrentUser(userId) {
    return await contractsDB.getAllContractsForCurrentUser(userId)
}

const contractUC = {
    getAll,
    getContractById,
    getContractCurrentUser
}

module.exports = {
    contractUC
};
