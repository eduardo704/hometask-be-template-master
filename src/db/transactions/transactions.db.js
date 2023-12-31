const { Job, Profile, sequelize } = require("../../model");

async function paymentTransaction(payingUser, job, contractor) {
    return await sequelize.transaction(async (t) => {
        await Profile.update(
            { balance: payingUser.balance - job.price },
            { where: { id: payingUser.id } }, { transaction: t }
        );
        await Profile.update(
            { balance: payingUser.balance + job.price },
            { where: { id: contractor.id } }, { transaction: t }
        );
        await Job.update(
            { paid: true },
            { where: { id: job.id } }, { transaction: t }
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
