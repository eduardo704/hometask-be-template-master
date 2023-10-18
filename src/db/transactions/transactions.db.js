const { Job,  Profile, sequelize } = require("../../model");

async function paymentTransaction(payingUser, job, contractor) {
    await sequelize.transaction(async (t) => {
        await Profile.update(
            { balance: payingUser.balance - job.price },
            { where: { id: payingUser.id } }
        );
        await Profile.update(
            { balance: payingUser.balance + job.price },
            { where: { id: contractor.id } }
        );
        await Job.update(
            { paid: true },
            { where: { id: job.id } }
        );

        return true;

    });
}

const transactionsDB = {
    paymentTransaction,
}

module.exports = {
    transactionsDB
};
