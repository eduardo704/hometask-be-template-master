const { contractUC } = require('../contracts/contracts.usecases');
const { contractsDB } = require("../../db/contracts/contract.db");
const { mockContract, mockUser } = require('../../utils/mocks/models.mock');

jest.mock('../../db/contracts/contract.db');


describe('Contracts use Case', () => {
    describe('GetContractById', () => {
        test('Should call the db with the correct id', async () => {
            const spy = jest.fn().mockReturnValue(mockContract);
            contractsDB.getContractById = spy;

            await contractUC.getContractById(1);
            expect(spy).toHaveBeenCalledWith(1);
        });
    })

    describe('getAll', () => {
        test('Should call the db once', async () => {
            const spys = jest.fn().mockReturnValue([mockContract]);
            contractsDB.getAllContracts = spys;

            await contractUC.getAll();
            expect(spys).toHaveBeenCalled();
        });
    });


    describe('getContractCurrentUser', () => {
        test('Should call the db with the correct id', async () => {
            const spy = jest.fn().mockReturnValue(mockUser);
            contractsDB.getAllContractsForCurrentUser = spy;

            await contractUC.getContractCurrentUser(1);
            expect(spy).toHaveBeenCalledWith(1);
        });
    });
})