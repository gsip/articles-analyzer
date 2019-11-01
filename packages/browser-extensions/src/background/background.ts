import { ExtractText } from '../modules/api/extract';
import { messenger } from '@reservoir-dogs/browser-transport';
import { extractResponse, extractRequest, ExtractType } from '@reservoir-dogs/model';

messenger.subscribe(ExtractType.EXTRACT_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const extractTextResponse = await ExtractText(action.payload);
    return extractResponse(extractTextResponse);
});
