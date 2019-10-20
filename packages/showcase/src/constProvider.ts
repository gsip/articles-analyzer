export const getNer = (): string | undefined => {
    return process.env.NER_API;
};

export const getAppPort = (): string => {
    return process.env.APP_PORT || '3000';
};

export const getConfigBucket = (): string => {
    return process.env.CONFIG_BUCKET || '';
};

export const getConfigFilename = (): string => {
    return process.env.CONFIG_FILE || '';
};
