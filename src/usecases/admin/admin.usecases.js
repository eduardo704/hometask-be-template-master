const { Job, Contract, Profile, sequelize } = require("../../model");
const { Op } = require("sequelize");

async function professionMadeMoreMoneyForTime(start, end) {
    const contracts = await Contract.findAll({
        include: [
            {
                model: Profile,
                as: 'Contractor',
            },
            {
                model: Job,
                where: {
                    paid: true,
                    updatedAt: {
                        [Op.between]: [start, end]
                    }
                },
            }
        ]
    },);



    let mostPaidProfessions = {}

    contracts.forEach(contract => {
        const profession = contract.Contractor.profession;

        contract.Jobs.reduce((prev, curr) => {
            const val = prev[profession] || 0;

            prev[profession] = curr.price + val;
            return prev;
        }, mostPaidProfessions)

    })

    let biggest = { name: '', total: 0 };

    for (const key in mostPaidProfessions) {
        const element = mostPaidProfessions[key];

        if (element > biggest.total) {
            biggest = { name: key, total: element }
        }

    }

    return biggest;
}







const adminUC = {
    professionMadeMoreMoneyForTime,
}

module.exports = {
    adminUC
};
