import fetch from 'node-fetch';
import cheerio from 'cheerio';

type Response = {
    title: string;
    url: string;
    summary: string;
};

export const getRequest = async (queries: string[], site?: string): Promise<Response> => {
    let query = queries
        // .map((q) => `"${q}"`)
        .join(' ');
    query = site ? `site:${site} ${queries}` : query;

    const res = await fetch(`https://duckduckgo.com/html/?q=${query}`);
    const html = await res.text();
    const $ = cheerio.load(html);

    const titles = $('.result__title');
    const urls = $('.result__url');
    const summaries = $('.result__snippet');

    return {
        title: $(titles[0])
            .text()
            .trim(),
        url: $(urls[0])
            .attr('href')
            .trim(),
        summary: $(summaries[0]).text(),
    };
};

(async () => console.log(await getRequest(['javascript', 'vue', 'angular'])))();
