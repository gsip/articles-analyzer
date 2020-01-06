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

type ParsePageResponse = {
    response: CommonTextResponse;
    htmlElements: HTMLElement[];
};

async function parsePage(href: string): Promise<ParsePageResponse> {
    const { text, htmlElements } = parseMainContent(document, href);

    if (text.length === 0) {
        throw new Error('text is empty');
    }

    // TODO #92: Delete it
    console.log(text); // Very useful. This schedule should be while the project is being developed.

    const response = await messenger.send<CommonTextResponse>(extractRequest(text));

    if (!response) {
        throw new Error('response is empty');
    }

    return { response, htmlElements };
}

const memoizedParsePage = memoize((url: string) => parsePage(url));

export const initializeParsePage = (): void => {
    messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async ({ payload: colorType }: ParsePageActionsType) => {
        try {
            const { response, htmlElements } = await memoizedParsePage(location.href);

            colorizeText(response, htmlElements);
            if (colorType === ColorType.MONO) {
                enableMonoColorize();
            }

            return response;
        } catch (e) {
            return;
        }
    });
};
