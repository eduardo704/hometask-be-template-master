const { contractsDB } = require("../../db/contracts/contract.db");


async function professionMadeMoreMoneyForTime(start, end) {
    const contracts = await contractsDB.getContractsWithContractorAndJobsBetweenDate(start, end);

    let mostPaidProfessions = mapMostPaidProfessions(contracts);

    return orderByMostPaid(mostPaidProfessions);
}


async function bestCustomers(start, end, limit = 2) {
    const contracts = await contractsDB.getContractsWithClientAndJobsBetweenDate(start, end);

    const mapped = getTotalPriceByJob(contracts)

    const best = mapped.sort((a, b) => b.totalPrice - a.totalPrice)

    return best.slice(0, limit);
}


const adminUC = {
    professionMadeMoreMoneyForTime,
    bestCustomers
}

module.exports = {
    adminUC
}

function getTotalPriceByJob(contracts) {
    return contracts.map(contract => {
        const totalPrice = contract.Jobs.reduce((prev, curr) => {
            return prev + curr.price;
        }, 0);
        contract['totalPrice'] = totalPrice;
        return { totalPrice, client: contract.Client };
    });
}

function mapMostPaidProfessions(contracts) {
    let mostPaidProfessions = {};

    contracts.forEach(contract => {
        const profession = contract.Contractor.profession;

        contract.Jobs.reduce((prev, curr) => {
            const val = prev[profession] || 0;

            prev[profession] = curr.price + val;
            return prev;
        }, mostPaidProfessions);

    });
    return mostPaidProfessions;
}

function orderByMostPaid(mostPaidProfessions) {
    let biggest = { name: '', total: 0 };

    for (const key in mostPaidProfessions) {
        const element = mostPaidProfessions[key];

        if (element > biggest.total) {
            biggest = { name: key, total: element };
        }
    }

    return biggest;
}