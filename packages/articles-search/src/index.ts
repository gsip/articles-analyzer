import cheerio from 'cheerio';
import { startFrom } from './utils';

export type ArticleMeta = {
    title: string;
    url: string;
    summary: string;
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
    try {
        let query = queries
            // .map((q) => `"${q}"`)
            .join(' ');
        query = site ? `site:${site} ${queries}` : query;

        // FIXME [AS-75] make fetch working with nodejs and window
        const res = await fetch(`https://duckduckgo.com/html/?q=${query} !safeon`);
        const html = await res.text();
        const $ = cheerio.load(html);

        const titles = $('.result__title');
        const urls = $('.result__url');
        const summaries = $('.result__snippet');
        const result = [];

        for (let i = 0; i < count; i++) {
            const title = getText($(titles[i]));
            const url = getUrl($(urls[i]));
            const summary = getText($(summaries[i]));

            result.push({ title, url, summary });
        }

        return result;
    } catch (e) {
        console.error(e);
        return [];
    }
};
