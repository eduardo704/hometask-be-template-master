const { Job, Contract, Profile, sequelize } = require("../../model");
const { Op } = require("sequelize");

async function getUnpaidForUser(userId) {
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

async function pay(jobId, userId) {
    const payingUser = await Profile.findOne({ where: { id: userId } });
    const contract = await Contract.findOne({
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

    const job = contract.Jobs[0];
    const contractor = contract.Contractor;

    // return contract;

    if (payingUser && job && contractor) {
        if (payingUser.balance > job.price && !job.paid) {
            try {
                await sequelize.transaction(async (t) => {
                    await Profile.update(
                        { balance: payingUser.balance - job.price },
                        { where: { id: payingUser.id } }
                    )
                    await Profile.update(
                        { balance: payingUser.balance + job.price },
                        { where: { id: contractor.id } }
                    )
                    await Job.update(
                        { paid: true },
                        { where: { id: job.id } }
                    )

                    return true;

                });
                return true;

            } catch (error) {

                console.log(error)

            }
        } else {
            return 'Not enough balance'
        }
    } else {
        return 'Not Found'
    }
    return 'Not Found'
}







const jobUC = {
    getUnpaidForUser,
    pay
}

module.exports = {
    jobUC
};
