import wiki from 'wikijs';

export const getWikiSummary = (title: string): Promise<string> => {
    return wiki()
        .page(title)
        .then((page) => page.summary());
};
