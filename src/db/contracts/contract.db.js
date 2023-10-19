const { Contract, Profile, Job } = require("../../model");
const { Op } = require("sequelize");

async function getContractById(id) {
    return await Contract.findOne({ where: { id } })
}

async function getAllContracts() {
    return await Contract.findAll({ include: { all: true, nested: true } });
}

async function getAllContractsForCurrentUser(userId) {
    return await Contract.findAll({
        where: {
            status: {
                [Op.not]: 'terminated',
            },
            [Op.or]: [{ ClientId: userId }, { ContractorId: userId }]
        }
    })
}
async function getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith(userId) {
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
    })
}

async function getContractWithContractorByJobId(jobId) {
    return await Contract.findOne({
        include: [
            {
                model: Job,
                where: { id: jobId },
            },
            {
                model: Profile,
                as: 'Contractor'
            }
        ]
    },);
}

async function getContractsWithContractorAndJobsBetweenDate(start, end) {
    return await Contract.findAll({
        include: [
            {
                model: Profile,
                as: 'Contractor',
            },
            {
                model: Job,
                where: {
                    paid: true,
                    paymentDate: {
                        [Op.between]: [start, end]
                    }
                },
            }
        ]
    });
}
async function getContractsWithClientAndJobsBetweenDate(start, end) {
    return await Contract.findAll({
        // group: 'Contract.id',
        // attributes:[
        //     [sequelize.fn('SUM',sequelize.col('Jobs.price')), 'totalPayment']
        // ],
        include: [
            {
                model: Profile,
                as: 'Client',
            },

            {
                model: Job,
                where: {
                    paid: true,
                    paymentDate: {
                        [Op.between]: [start, end]
                    }
                },
            }
        ]
    });
}



const contractsDB = {
    getContractById,
    getAllContracts,
    getAllContractsForCurrentUser,
    getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith,
    getContractWithContractorByJobId,
    getContractsWithContractorAndJobsBetweenDate,
    getContractsWithClientAndJobsBetweenDate
}

module.exports = {
    contractsDB
};
