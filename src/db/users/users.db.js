const { Contract, Profile } = require("../../model");
const { Op } = require("sequelize");

async function getUserById(id) {
    return await Profile.findOne({ where: { id } })
}
async function getUserWithContractAndNotPaidJobs(userId) {
    return await Profile.findOne({
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
}


const usersDB = {
    getUserById,
    getUserWithContractAndNotPaidJobs

}

module.exports = {
    usersDB
};
