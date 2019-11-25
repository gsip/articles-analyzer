export const sliceFrom = (text: string, start: string): string => {
    const startIndex = text.indexOf(start);

    return text.slice(startIndex);
};
