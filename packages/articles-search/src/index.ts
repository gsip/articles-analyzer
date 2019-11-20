import cheerio from 'cheerio';
import { startFrom } from './utils';
import nodeFetch from 'node-fetch';
import { URLS } from './config';

export type ArticleMeta = {
    title: string;
    url: string;
    summary: string;
};

const getFetch = (): typeof nodeFetch | typeof fetch => {
    if (typeof window === 'undefined') {
        return nodeFetch;
    }

    return fetch;
};

const getText = ($element: Cheerio): string => {
    return $element.text().trim();
};

const getUrl = ($element: Cheerio): string => {
    const url = $element.attr('href');

    if (!url) {
        return '';
    }

    return decodeURIComponent(startFrom(url, 'http').trim());
};

export const getArticlesMeta = async (queries: string[], site?: string, count = 3): Promise<ArticleMeta[]> => {
    if (queries.length === 0) {
        return [];
    }

    try {
        const query = queries.join(' ');

        const res = await getFetch()(URLS.getDuckDuckGoSearchUrl(query, site));
        const html = await res.text();
        const $ = cheerio.load(html);

        const titles = $('.result__title');
        const urls = $('.result__url');
        const summaries = $('.result__snippet');
        const articlesMeta = [];

        for (let i = 0; i < count; i++) {
            const title = getText($(titles[i]));
            const url = getUrl($(urls[i]));
            const summary = getText($(summaries[i]));

            articlesMeta.push({ title, url, summary });
        }

        return articlesMeta.filter((articleMeta) => articleMeta.url);
    } catch (e) {
        console.error(e);
        return [];
    }
};
