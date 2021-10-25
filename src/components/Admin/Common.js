export const userEntity = "User";
export const clientEntity = "Client";
export const entities = [
    userEntity,
    clientEntity
]

export const userApiGetById = `Get ${userEntity} by id`;
export const userApiGetByEmail = `Get ${userEntity} by email`;
export const userGenerateApiKey = `Generate ${userEntity} API key`;
export const userApis = [
    userApiGetById,
    userApiGetByEmail,
    userGenerateApiKey,
];

export const clientApiById = `Get ${clientEntity} by id`;
export const clientEnable = `Enable ${clientEntity}`;
export const clientDisable = `Disable ${clientEntity}`;
export const clientGenerateApiKey = `Generate ${clientEntity} API key`;
export const clientApis = [
    clientApiById,
    clientEnable,
    clientDisable,
    clientGenerateApiKey,
];