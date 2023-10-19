const { contractsDB } = require("../../db/contracts/contract.db");
const { transactionsDB } = require("../../db/transactions/transactions.db");
const { usersDB } = require("../../db/users/users.db");
const { mockContractWithJobs, mockUser, mockContractWithJobsAndContractor } = require('../../utils/mocks/models.mock');
const { jobUC } = require("../jobs/jobs.usecases");

jest.mock('../../db/contracts/contract.db');


describe('Jobs use Case', () => {
    describe('getUnpaidJobsForUser', () => {
        test('Should get Jobs from db and map correctly', async () => {
            const spy = jest.fn().mockReturnValue(Promise.resolve([mockContractWithJobs]));
            contractsDB.getAllNonTerminatedContractsWithUnpaidJobsThatCurrentUserIsInvolvedWith = spy;

            const response = await jobUC.getUnpaidJobsForUser(1);

            expect(spy).toHaveBeenCalledWith(1);
            expect(response[0]).toEqual(mockContractWithJobs.Jobs[0]);
        });
    })
    describe('pay', () => {
        describe('With unpaid job and user with enough balance',  () => {
            test('Should go ahead and update db with payment information', async () => {
                const userSpy = jest.fn().mockReturnValue(Promise.resolve(mockUser));
                usersDB.getUserById = userSpy;

                const contractSpy = jest.fn().mockReturnValue(Promise.resolve(mockContractWithJobsAndContractor));
                contractsDB.getContractWithContractorByJobId = contractSpy;

                const transactionSpy = jest.fn().mockReturnValue(Promise.resolve(true));
                transactionsDB.paymentTransaction = transactionSpy;


                const response = await jobUC.pay(1, 2);


                expect(response).toBeTruthy();
            });
        })
    })

})