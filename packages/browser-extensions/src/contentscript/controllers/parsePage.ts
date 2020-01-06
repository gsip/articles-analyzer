import { colorizeWords, enableMonoColorize } from '../../modules/markHTML/markHTML';
import {
    TextMeta,
    extractRequest,
    NERConfig,
    ParsePageType,
    ParsePageActionsType,
    ColorType,
} from '@reservoir-dogs/model';
import { messenger } from '@reservoir-dogs/browser-transport';
import { parseMainContent } from '@reservoir-dogs/html-parser';
import { memoize } from 'lodash-es';

function colorizeText(textMeta: TextMeta, htmlElements: HTMLElement[]): void {
    textMeta.nerEntities.forEach(([NEREntityName, NEREntities]) => {
        const color = NERConfig[NEREntityName] ? NERConfig[NEREntityName].color : '';

        if (NEREntities && color) {
            const words = NEREntities.map((entity) => entity.word);

            colorizeWords(htmlElements, words, color);
        }
    });
}

type ParsePageResponse = {
    textMeta: TextMeta;
    htmlElements: HTMLElement[];
};

async function parsePage(href: string): Promise<ParsePageResponse> {
    const { text, htmlElements } = parseMainContent(document, href);

    if (text.length === 0) {
        throw new Error('text is empty');
    }

    // TODO #92: Delete it
    console.log(text); // Very useful. This schedule should be while the project is being developed.

    const textMeta = await messenger.send<TextMeta>(extractRequest(text));

    if (!textMeta) {
        throw new Error('textMeta is empty');
    }

    return { textMeta, htmlElements };
}

const memoizedParsePage = memoize((url: string) => parsePage(url));

export const initializeParsePage = (): void => {
    messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async ({ payload: colorType }: ParsePageActionsType) => {
        try {
            const { textMeta, htmlElements } = await memoizedParsePage(location.href);

            colorizeText(textMeta, htmlElements);
            if (colorType === ColorType.MONO) {
                enableMonoColorize();
            }

            return textMeta;
        } catch (e) {
            return {};
        }
    });
};
