import { ExtractText } from '../modules/api/extract';
import { Messenger } from '../modules/messages';
import { extractRequest, extractResponse, ExtractType } from '../modules/messages/actions/extract';
import { WikiType } from '../modules/messages/actions/wiki';

const messenger = new Messenger();
messenger.subscribe(ExtractType.EXTRACT_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const extractTextResponse = await ExtractText(action.payload);
    return extractResponse(extractTextResponse.ents);
});

messenger.subscribe(WikiType.WIKI_REQUEST, async (action: ReturnType<typeof extractRequest>) => {
    const extractTextResponse = await ExtractText(action.payload);
    return extractResponse(extractTextResponse.ents);
});
