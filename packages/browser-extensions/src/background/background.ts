import { getNER, getSummary } from '../modules/api/extract';
import { messenger } from '@reservoir-dogs/browser-transport';
import {
    extractRequest,
    ExtractType,
    ContentPageEvent,
    PopupPageEvent,
    keywordHover,
    wantToGetSimilarArticles,
    getMainKeywords,
} from '@reservoir-dogs/model';
import { getWikiSummary } from '../modules/wikipedia';
import { getArticlesMeta } from '@reservoir-dogs/articles-search';
import { ArticleMeta } from '@reservoir-dogs/articles-search';

messenger.subscribe(ExtractType.EXTRACT_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const [ner, summary] = await Promise.all([getNER(action.payload), getSummary(action.payload)]);

    return { ner, summary };
});

messenger.subscribe(ContentPageEvent.KEYWORD_HOVER, async (action: ReturnType<typeof keywordHover>) => {
    const summary = await getWikiSummary(action.payload);

    return summary;
});

messenger.subscribe(
    PopupPageEvent.WANT_TO_GET_SIMILAR_ARTICLES,
    (action: ReturnType<typeof wantToGetSimilarArticles>): Promise<ArticleMeta[]> => {
        return new Promise((resolve) => {
            chrome.tabs.getSelected(async (tab) => {
                if (!tab || !tab.url) {
                    console.error('Can not find active tab url');

                    return [];
                }
                const mainKeywords = getMainKeywords(action.payload);
                const urlObject = new URL(tab.url);
                const articlesMeta = await getArticlesMeta(mainKeywords, urlObject.hostname, 4);

                const filteredArticlesMeta = articlesMeta
                    .filter((articleMeta) => {
                        return !articleMeta.url.includes(urlObject.origin + urlObject.pathname);
                    })
                    .slice(0, 3);

                resolve(filteredArticlesMeta);
            });
        });
    },
);
