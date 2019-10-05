import { ExtractText } from '../modules/api/extract';
import { Messenger } from '../modules/messages';
import { extractRequest, extractResponse } from '../modules/messages/actions/extract';

function getByType(data: object, type: string) {
    const facentities =
        data &&
        Object.keys(data)
            .filter((key) => {
                return key === type;
            })
            .map((key) => {
                // @ts-ignore
                return data[key];
            });

    return facentities ? facentities.flat().map<string>(({ word }) => word) : [];
}

const messenger = new Messenger();
messenger.subscribe('EXTRACT_REQUEST', async (action: ReturnType<typeof extractRequest>) => {
    const extractTextResponse = await ExtractText(action.payload);
    return extractResponse(extractTextResponse.ents);
});

chrome.runtime.onMessage.addListener(async function(request, _sender, sendResponse) {
    if (request.type == 'parseText') {
        try {
            const FAC = getByType(data.ents, 'FAC');
            const EVENT = getByType(data.ents, 'EVENT');
            const GPE = getByType(data.ents, 'GPE');
            const PERSON = getByType(data.ents, 'PERSON');
            const PRODUCT = getByType(data.ents, 'PRODUCT');
            const LOC = getByType(data.ents, 'LOC');
            const ORG = getByType(data.ents, 'ORG');

            sendResponse({
                type: 'parseText',
                data: {
                    FAC,
                    EVENT,
                    GPE,
                    PERSON,
                    PRODUCT,
                    LOC,
                    ORG,
                },
            });
        } catch (error) {
            console.log('!! error', error);
        }

        return true;
    }
});
