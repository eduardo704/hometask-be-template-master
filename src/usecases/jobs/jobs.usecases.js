const { contractsDB } = require("../../db/contracts/contract.db");
const { transactionsDB } = require("../../db/transactions/transactions.db");
const { usersDB } = require("../../db/users/users.db");

async function getUnpaidJobsForUser(userId) {
    return contractsDB.getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith(userId)
        .then(contracts => contracts.flatMap(contract => contract.Jobs))
}

async function pay(jobId, userId) {
    const payingUser = await usersDB.getUserById(userId);
    const contract = await contractsDB.getContractWithContractorByJobId(jobId)

    const job = contract.Jobs[0];
    const contractor = contract.Contractor;

    if (payingUser && job && contractor) {
        if (payingUser.balance > job.price && !job.paid) {
            try {
                await transactionsDB.paymentTransaction(payingUser, job, contractor);
                return true;
            } catch (error) {
                console.log(error)
                return 'Not Found'
            }
        } else {
            return 'Not enough balance'
        }
    } else {
        return 'Not Found'
    }
}







const jobUC = {
    getUnpaidJobsForUser,
    pay
}

module.exports = {
    jobUC
};

