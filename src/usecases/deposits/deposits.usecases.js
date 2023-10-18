const { Job, Contract, Profile, sequelize } = require("../../model");
const { Op } = require("sequelize");

async function depositForUser(userId, amount) {
    const profile = await Profile.findOne({
        include: {
            model: Contract,
            as: 'Client',
            where: {
                status: {
                    [Op.not]: 'terminated',
                },
            },
            include: {
                model: Job,
                where: {
                    paid: {
                        [Op.not]: true,
                    }
                }
            }
        },
        where: {
            id: userId
        }
    });



    const jobs = profile.Client.flatMap(contract => contract.Jobs)//||[];

    const totalToPay = jobs.reduce((prev, curr) => {
        console.log(curr)
        return prev + curr.price
    }, 0)

    const maxDeposit = totalToPay * 0.25;

    if (maxDeposit > amount) {
        await profile.increment({ 'balance': amount })
        return { profile }
    } else {
        return 'Amount over max allowed'
    }



}







const depostisUC = {
    depositForUser,
}

module.exports = {
    depostisUC
};
