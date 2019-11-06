import { colorizeWords } from '../../modules/markHTML/markHTML';
import {
    CommonTextResponse,
    extractRequest,
    NERConfig,
    NEREntitiesTypesList,
    NEREntity,
    ParsePageType,
} from '@reservoir-dogs/model';
import { messenger } from '@reservoir-dogs/browser-transport';
import { parseMainContent } from '@reservoir-dogs/html-parser';
import { memoize } from 'lodash-es';

function colorizeText(response: CommonTextResponse, htmlElements: HTMLElement[]): void {
    const NERList = Object.entries(response.ner) as [NEREntitiesTypesList, NEREntity[] | undefined][];

    NERList.forEach(([NEREntityName, NEREntities]) => {
        const color = NERConfig[NEREntityName] ? NERConfig[NEREntityName].color : '';

        if (NEREntities && color) {
            const words = NEREntities.map((entity) => entity.word);

            colorizeWords(htmlElements, words, color);
        }
    });
}

async function parsePage(): Promise<CommonTextResponse | undefined> {
    const { text, htmlElements } = parseMainContent(document, location.href);

    if (text.length === 0) {
        return;
    }

    const response = await messenger.send<CommonTextResponse>(extractRequest(text));

    if (!response) {
        return;
    }

    colorizeText(response, htmlElements);

    return response;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const memoizedParsePage = memoize((_url: string) => parsePage());

export const initializeParsePage = (): void => {
    messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async () => await memoizedParsePage(location.href));
};
