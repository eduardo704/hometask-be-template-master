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

async function bestCustomers(start, end, limit = 2) {
    const contracts = await Contract.findAll({
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
                    updatedAt: {
                        [Op.between]: [start, end]
                    }
                },
            }
        ]
    },);

    const mapped = contracts.map(contract => {

        const totalPrice = contract.Jobs.reduce((prev, curr) => {

            return prev + curr.price;
        }, 0)
        contract['totalPrice'] = totalPrice;
        return { totalPrice, client: contract.Client };

    })

    const best = mapped.sort((a, b) => b.totalPrice - a.totalPrice)

    return best.slice(0, limit);
}


const adminUC = {
    professionMadeMoreMoneyForTime,
    bestCustomers
}

module.exports = {
    adminUC
};
