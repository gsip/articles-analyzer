import { parseMainContent } from '@reservoir-dogs/html-parser';
import { colorizeWords } from '../modules/markHTML/markHTML';
import { messenger } from '@reservoir-dogs/browser-transport';
import {
    extractResponse,
    extractRequest,
    ParsePageType,
    parsePageResponse,
    NEREntitiesTypesList,
    NEREntity,
    NERConfig,
} from '@reservoir-dogs/model';

messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async () => {
    const { text, selector } = parseMainContent(document, location.href);

    if (text.length === 0) {
        return;
    }

    const response = await messenger.send<ReturnType<typeof extractResponse>>(extractRequest(text));

    if (!response || !response.payload) {
        return;
    }

    const NERList = Object.entries(response.payload) as [NEREntitiesTypesList, NEREntity[] | undefined][];

    NERList.forEach(([NEREntityName, NEREntities]) => {
        const color = NERConfig[NEREntityName] ? NERConfig[NEREntityName].color : '';

        if (NEREntities && color) {
            const words = NEREntities.map((entity) => entity.word);

            colorizeWords(selector, words, color);
        }
    });

    return parsePageResponse(response.payload);
});
