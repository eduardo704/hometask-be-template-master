const { Contract } = require("../../model");
const { Op } = require("sequelize");

async function getContractById(id) {
    return await Contract.findOne({ where: { id } })
}
async function getAll() {
    return await Contract.findAll({ include: { all: true, nested: true }});
}


async function getContractCurrentUser(userId) {
    return await Contract.findAll({
        where: {
            status: {
                [Op.not]: 'terminated',
            },
            [Op.or]: [{ ClientId: userId }, { ContractorId: userId }]
        }
    })
}

const contractUC = {
    getAll,
    getContractById,
    getContractCurrentUser
}

module.exports = {
    contractUC
};
