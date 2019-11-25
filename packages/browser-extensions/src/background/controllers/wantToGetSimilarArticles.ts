import { messenger } from '@reservoir-dogs/browser-transport';
import { PopupPageEvent, wantToGetSimilarArticles, getMainKeywords, NEREntities } from '@reservoir-dogs/model';
import { getArticlesMeta } from '@reservoir-dogs/articles-search';
import { ArticleMeta } from '@reservoir-dogs/articles-search';
import { memoize } from 'lodash-es';

const getSelectedTab = (): Promise<chrome.tabs.Tab | null> => {
    return new Promise((resolve) => {
        chrome.tabs.getSelected(async (tab) => {
            if (!tab?.url) {
                resolve(null);
            }

            resolve(tab);
        });
    });
};

const getSuitableArticles = memoize(
    async (url: string, nerEntities: NEREntities, count = 3): Promise<ArticleMeta[]> => {
        const mainKeywords = getMainKeywords(nerEntities);
        const urlObject = new URL(url);
        const articlesMeta = await getArticlesMeta(mainKeywords, urlObject.hostname, 4);
        const articlesMetaWithoutCurrentArticle = articlesMeta.filter(
            (articleMeta) => !articleMeta.url.includes(urlObject.origin + urlObject.pathname),
        );

        return articlesMetaWithoutCurrentArticle.slice(0, count);
    },
);

export const initializeWantToGetSimilarArticles = (): void => {
    messenger.subscribe(
        PopupPageEvent.WANT_TO_GET_SIMILAR_ARTICLES,
        async (action: ReturnType<typeof wantToGetSimilarArticles>): Promise<ArticleMeta[]> => {
            const tab = await getSelectedTab();

            if (!tab?.url) {
                console.error('Can not find active tab url');

                return [];
            }

            return getSuitableArticles(tab.url, action.payload);
        },
    );
};
