import { colorizeWords, enableMonoColorize } from '../../modules/markHTML/markHTML';
import {
    CommonTextResponse,
    extractRequest,
    NERConfig,
    NEREntitiesTypesList,
    NEREntity,
    ParsePageType,
    ParsePageActionsType,
    ColorType,
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

async function parsePage(href: string): Promise<CommonTextResponse | undefined> {
    const { text, htmlElements } = parseMainContent(document, href);

    if (text.length === 0) {
        return;
    }

    // TODO #92: Delete it
    console.log(text); // Very useful. This schedule should be while the project is being developed.

    const response = await messenger.send<CommonTextResponse>(extractRequest(text));

    if (!response) {
        return;
    }

    colorizeText(response, htmlElements);

    return response;
}

const memoizedParsePage = memoize((url: string) => parsePage(url));

export const initializeParsePage = (): void => {
    messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async ({ payload: colorType }: ParsePageActionsType) => {
        const response = await memoizedParsePage(location.href);

        if (colorType === ColorType.MONO) {
            enableMonoColorize();
        }

        return response;
    });
};
