const mockContract = {
    "id": 1,
    "terms": "bla bla bla",
    "status": "terminated",
    "createdAt": "2023-10-17T14:19:54.228Z",
    "updatedAt": "2023-10-17T14:19:54.228Z",
    "ContractorId": 5,
    "ClientId": 1,
}
const mockUser = {
    "id": 1,
    "firstName": "Harry",
    "lastName": "Potter",
    "profession": "Wizard",
    "balance": 1478,
    "type": "client",
    "createdAt": "2023-10-17T14:19:54.227Z",
    "updatedAt": "2023-10-18T19:05:31.503Z"
}

const mockJob = {
    "id": 11,
    "description": "work",
    "price": 21,
    "paid": true,
    "paymentDate": "2020-08-10T19:11:26.737Z",
    "createdAt": "2023-10-17T14:19:54.229Z",
    "updatedAt": "2023-10-17T14:19:54.229Z",
    "ContractId": 1
};
const mockContractWithJobs = {
    "id": 1,
    "terms": "bla bla bla",
    "status": "terminated",
    "createdAt": "2023-10-17T14:19:54.228Z",
    "updatedAt": "2023-10-17T14:19:54.228Z",
    "ContractorId": 5,
    "ClientId": 1,
    "Jobs": [
        {
            "id": 11,
            "description": "work",
            "price": 21,
            "paid": false,
            "paymentDate": null,
            "createdAt": "2023-10-17T14:19:54.229Z",
            "updatedAt": "2023-10-17T14:19:54.229Z",
            "ContractId": 1
        },
        {
            "id": 12,
            "description": "test",
            "price": 222,
            "paid": false,
            "paymentDate": null,
            "createdAt": "2023-10-17T14:19:54.229Z",
            "updatedAt": "2023-10-17T14:19:54.229Z",
            "ContractId": 1
        }
    ]
}
const mockContractWithJobsAndContractor = {
    "id": 1,
    "terms": "bla bla bla",
    "status": "terminated",
    "createdAt": "2023-10-17T14:19:54.228Z",
    "updatedAt": "2023-10-17T14:19:54.228Z",
    "Contractor": {
        "id": 1,
        "firstName": "Harry",
        "lastName": "Potter",
        "profession": "Wizard",
        "balance": 1478,
        "type": "client",
        "createdAt": "2023-10-17T14:19:54.227Z",
        "updatedAt": "2023-10-18T19:05:31.503Z"
    },
    "ClientId": 1,
    "Jobs": [
        {
            "id": 11,
            "description": "work",
            "price": 21,
            "paid": false,
            "paymentDate": null,
            "createdAt": "2023-10-17T14:19:54.229Z",
            "updatedAt": "2023-10-17T14:19:54.229Z",
            "ContractId": 1
        },
        {
            "id": 12,
            "description": "test",
            "price": 222,
            "paid": false,
            "paymentDate": null,
            "createdAt": "2023-10-17T14:19:54.229Z",
            "updatedAt": "2023-10-17T14:19:54.229Z",
            "ContractId": 1
        }
    ]
}
module.exports = {
    mockContract,
    mockUser,
    mockJob,
    mockContractWithJobs,
    mockContractWithJobsAndContractor
};
