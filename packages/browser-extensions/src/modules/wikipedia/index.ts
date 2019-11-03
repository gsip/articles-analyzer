import wiki from 'wikijs';

export type WikiSummary = {
    summary: string;
    url: string;
};

export const getWikiSummary = async (title: string): Promise<WikiSummary> => {
    const page = await wiki().page(title);

    const [summary, url] = await Promise.all([page.summary(), page.url()]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore https://github.com/dijs/wiki/pull/130
    return { summary, url };
};
