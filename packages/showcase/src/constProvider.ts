export const getNer = (): string | undefined => {
    return process.env.NER_API;
};

export const getAppPort = (): number | string => {
    return process.env.APP_PORT || 3000;
};
