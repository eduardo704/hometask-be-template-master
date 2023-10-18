const { usersDB } = require("../../db/users/users.db");


async function depositForUser(userId, amount) {
    const profile = await usersDB.getUserWithContractAndNotPaidJobs(userId);

    const jobs = profile.Client.flatMap(contract => contract.Jobs)

    const totalToPay = getTotalToPay(jobs);

    let maxDeposit = Number.MAX_SAFE_INTEGER;

    if (totalToPay > 0) {
        maxDeposit = totalToPay * 0.25;
    }

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

function getTotalToPay(jobs) {
    return jobs.reduce((prev, curr) => {
        return prev + curr.price;
    }, 0);
}