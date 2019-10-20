import { ExtractText } from '../modules/api/extract';
import { Messenger } from '@reservoir-dogs/browser-transport';
import { extractRequest, extractResponse, ExtractType } from '../modules/messages/actions/extract';

const messenger = new Messenger();
messenger.subscribe(ExtractType.EXTRACT_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const extractTextResponse = await ExtractText(action.payload);
    return extractResponse(extractTextResponse.ents);
});
