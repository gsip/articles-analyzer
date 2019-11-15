export const startFrom = (text: string, start: string): string => {
    return start + text.split(start)[1];
};
