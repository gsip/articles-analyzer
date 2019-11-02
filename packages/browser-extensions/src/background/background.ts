import { getNER, getSummary } from '../modules/api/extract';
import { messenger } from '@reservoir-dogs/browser-transport';
import { extractRequest, ExtractType } from '@reservoir-dogs/model';

messenger.subscribe(ExtractType.EXTRACT_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const [ner, summary] = await Promise.all([getNER(action.payload), getSummary(action.payload)]);

    return { ner, summary };
});
