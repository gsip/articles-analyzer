export const isTextValid = (text: string): boolean => {
    return typeof text === 'string' && text.length > 0;
};
