export const isEmpty = (text: string | undefined): boolean => {
    return typeof text !== 'string' || text.length == 0;
};
