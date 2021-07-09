export const userEntity = "User";
export const clientEntity = "Client";
export const entities = [
    userEntity,
    clientEntity
]

export const userApiGetById = `Get ${userEntity} by id`;
export const userApiGetByEmail = `Get ${userEntity} by email`;
export const userApis = [
    userApiGetById,
    userApiGetByEmail,
];

export const clientApiById = `Get ${clientEntity} by id`;
export const clientApiByKey = `Get ${clientEntity} by key`;
export const clientEnable = `Enable ${clientEntity}`;
export const clientDisable = `Disable ${clientEntity}`;
export const clientApis = [
    clientApiById,
    clientApiByKey,
    clientEnable,
    clientDisable,
];