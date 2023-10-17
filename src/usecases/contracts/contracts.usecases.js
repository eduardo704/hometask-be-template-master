const { Contract } = require("../../model");

async function getContractById(id){
    return await Contract.findOne({ where: { id } })
}

const contractUC ={
    getContractById
}

module.exports = {
    contractUC
  };
  