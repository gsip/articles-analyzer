import { colorizeWord, createStyleForColor, enableMonoColorize } from '../../modules/markHTML/markHTML';
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
import { getWithoutDuplicates, isNotEmpty } from './utils';

function colorizeText(textMeta: TextMeta, htmlElements: HTMLElement[]): void {
    const wordsWithColor = textMeta.nerEntities.map(([NEREntityName, NEREntities]) => {
        const color = NERConfig[NEREntityName] ? NERConfig[NEREntityName].color : '';
        if (!NEREntities || !color) {
            return null;
        }

        return NEREntities.map((entity) => ({ word: entity.word, color }));
    });

    const sortedWordsWithColor = wordsWithColor
        .filter(isNotEmpty)
        .flat()
        .sort(
            (wordWithColorLeft, wordWithColorRight) => wordWithColorRight.word.length - wordWithColorLeft.word.length,
        );

    const colors = sortedWordsWithColor.map((sortedWordWithColor) => sortedWordWithColor.color);

    getWithoutDuplicates(colors).forEach((color) => {
        createStyleForColor(color);
    });

    sortedWordsWithColor.forEach((sortedWordWithColor) => {
        colorizeWord(htmlElements, sortedWordWithColor.word, sortedWordWithColor.color);
    });
}

async function parsePage(href: string, colorType: ColorType): Promise<TextMeta> {
    const { text, htmlElements } = parseMainContent(document, href);

    if (text.length === 0) {
        throw new Error('text is empty');
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(text);
    }

    const textMeta = await messenger.send<TextMeta>(extractRequest(text));

    if (!textMeta) {
        throw new Error('textMeta is empty');
    }

    colorizeText(textMeta, htmlElements);
    if (colorType === ColorType.MONO) {
        enableMonoColorize();
    }

    return textMeta;
}

const memoizedParsePage = memoize((url: string, colorType: ColorType) => parsePage(url, colorType));

export const initializeParsePage = (): void => {
    messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async ({ payload: colorType }: ParsePageActionsType) => {
        try {
            return await memoizedParsePage(location.href, colorType);
        } catch (e) {
            return {};
        }
    });
};
