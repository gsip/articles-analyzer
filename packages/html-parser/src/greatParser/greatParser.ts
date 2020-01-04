import { Parser, ParserResponse } from '../types';
import {
    deleteElementsByTagName,
    deleteElementsBySelector,
    getText,
    deleteElementsByTagNameAndMinTextLength,
} from '../utils/parser';
import { getRootContentNode } from './rootNode';
import { getBestElement } from './recursiveParsing';

function filterNotSemanticElements(element: Element): Element {
    const MIN_TEXT_LENGTH = 400;
    const clonedElement = element.cloneNode(true) as Element;

    ['script', 'figure', 'iframe', 'img', 'header', 'footer', 'aside', 'table', 'nav'].forEach((name: string): void => {
        deleteElementsByTagName(clonedElement, name);
    });

    ['ul'].forEach((name: string): void => {
        deleteElementsByTagNameAndMinTextLength(clonedElement, name, MIN_TEXT_LENGTH);
    });

    deleteElementsBySelector(clonedElement, '[aria-hidden=true]');

    return clonedElement;
}

export const greatParser: Parser = (doc: Document, selector?: string, options?: HtmlToTextOptions): ParserResponse => {
    const rootContentNode = getRootContentNode(doc, selector);

    const rootContentNodeWithoutNonSemanticElements = filterNotSemanticElements(rootContentNode);

    const result = rootContentNodeWithoutNonSemanticElements
        ? getBestElement(rootContentNodeWithoutNonSemanticElements)
        : null;

    if (!result) {
        throw new Error('Great parser failed');
    }

    const text = getText([result.outerHTML], options);

    if (text === '') {
        throw new Error('text is empty');
    }

    return { text, htmlElements: [rootContentNode] as HTMLElement[] };
};
