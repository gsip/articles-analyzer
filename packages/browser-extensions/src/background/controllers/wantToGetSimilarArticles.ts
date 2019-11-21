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

const callback = memoize(
    async (url: string, nerEntities: NEREntities): Promise<ArticleMeta[]> => {
        const mainKeywords = getMainKeywords(nerEntities);
        const urlObject = new URL(url);
        const articlesMeta = await getArticlesMeta(mainKeywords, urlObject.hostname, 4);

        return articlesMeta
            .filter((articleMeta) => {
                return !articleMeta.url.includes(urlObject.origin + urlObject.pathname);
            })
            .slice(0, 3);
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

            return callback(tab.url, action.payload);
        },
    );
};
