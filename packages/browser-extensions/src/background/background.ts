import { ExtractText } from '../modules/api/extract';
import { Messenger } from '../modules/messages';
import { extractRequest, extractResponse } from '../modules/messages/actions/extract';

const messenger = new Messenger();
messenger.subscribe('EXTRACT_REQUEST', async (action: ReturnType<typeof extractRequest>) => {
    const extractTextResponse = await ExtractText(action.payload);
    return extractResponse(extractTextResponse.ents);
});
