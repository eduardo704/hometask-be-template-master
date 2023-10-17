const { Job, Contract } = require("../../model");
const { Op } = require("sequelize");

async function getUnpaidForUser(userId = 0) {
    // return await Job.findAll()

    return await Contract.findAll({
        include: {
            model: Job,
            where: {
                paid: {
                    [Op.not]: true,
                }
            }
        },
        where: {
            status: {
                [Op.not]: 'terminated',
            },
            [Op.or]: [{ ClientId: userId }, { ContractorId: userId }]
        }
    }).then(contracts => contracts.flatMap(contract => contract.Jobs))
}



const jobUC = {
    getUnpaidForUser
}

module.exports = {
    jobUC
};
