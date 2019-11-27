import { getNER, getSummary } from '../modules/api/extract';
import { messenger } from '@reservoir-dogs/browser-transport';
import { extractRequest, ExtractType, ContentPageEvent, keywordHover } from '@reservoir-dogs/model';
import { getWikiSummary } from '../modules/wikipedia';
import { initializeWantToGetSimilarArticles } from './controllers/wantToGetSimilarArticles';

messenger.subscribe(ExtractType.EXTRACT_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const [ner, summary] = await Promise.all([getNER(action.payload), getSummary(action.payload)]);

    return { ner, summary };
});

messenger.subscribe(ContentPageEvent.KEYWORD_HOVER, async (action: ReturnType<typeof keywordHover>) => {
    const summary = await getWikiSummary(action.payload);

    return summary;
});

initializeWantToGetSimilarArticles();
