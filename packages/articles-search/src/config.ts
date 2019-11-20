export const URLS = {
    getDuckDuckGoSearchUrl: (query: string, site?: string) => {
        const fullQuery = site ? `site:${site} ${query}` : query;

        return `https://duckduckgo.com/html/?q=${fullQuery} !safeon`;
    },
};
