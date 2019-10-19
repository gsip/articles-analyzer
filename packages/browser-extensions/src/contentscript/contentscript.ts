import { parseMainContent } from '@reservoir-dogs/html-parser';
import { colorizeEntities } from '../modules/markHTML/markHTML';
import { Messenger } from '../modules/messages';
import { extractRequest, extractResponse } from '../modules/messages/actions/extract';

document.addEventListener('DOMContentLoaded', async () => {
    const body = document.getElementsByTagName('body')[0];
    const text = parseMainContent(document, location.href);

    console.log(123);

    // if (text.length === 0) {
    //     return;
    // }
    //
    //
    // const messenger = new Messenger();
    // const response = await messenger.send<ReturnType<typeof extractResponse>>(extractRequest(text));
    //
    // if (!response || !response.payload) {
    //     return;
    // }
    //
    // const { FAC, EVENT, GPE, PERSON, PRODUCT, LOC, ORG } = response.payload;
    //
    // FAC && colorizeEntities(body, FAC, 'peru');
    // EVENT && colorizeEntities(body, EVENT, 'yellow');
    // GPE && colorizeEntities(body, GPE, 'violet');
    // PERSON && colorizeEntities(body, PERSON, 'magenta');
    // PRODUCT && colorizeEntities(body, PRODUCT, 'skyblue');
    // LOC && colorizeEntities(body, LOC, 'silver');
    // ORG && colorizeEntities(body, ORG, 'mediumorchid');
});
