import { getNER, getSummary } from '../modules/api/extract';
import { messenger } from '@reservoir-dogs/browser-transport';
import {
    extractRequest,
    ExtractType,
    ContentPageEvent,
    keywordHover,
    NERConfig,
    TextMeta,
    NEREntities,
} from '@reservoir-dogs/model';
import { getWikiSummary } from '../modules/wikipedia';
import { initializeWantToGetSimilarArticles } from './controllers/wantToGetSimilarArticles';

messenger.subscribe(
    ExtractType.EXTRACT_REQUEST,
    async (action: ReturnType<typeof extractRequest>): Promise<TextMeta> => {
        const [ner, summary] = await Promise.all([getNER(action.payload), getSummary(action.payload)]);

        const nerEntities = Object.entries(ner).filter(([entityName, words]) => {
            const entity = NERConfig[entityName as keyof typeof NERConfig];

            return entity && words !== undefined;
        }) as NEREntities;

        return { nerEntities, summary };
    },
);

messenger.subscribe(ContentPageEvent.KEYWORD_HOVER, async (action: ReturnType<typeof keywordHover>) => {
    const summary = await getWikiSummary(action.payload);

    return summary;
});

initializeWantToGetSimilarArticles();
