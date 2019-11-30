import { Parser, ParserResponse } from '../types';
import { deleteElementsByTagName, deleteElementsBySelector, getText } from '../utils/parser';
import { getRootContentNode } from './rootNode';
import { getBestElement } from './recursiveParsing';

function filterNotSemanticElements(element: Element): Element {
    const clonedElement = element.cloneNode(true) as Element;

    ['script', 'figure', 'iframe', 'img', 'header', 'footer', 'aside', 'table', 'nav', 'ul'].forEach(
        (name: string): void => {
            deleteElementsByTagName(clonedElement, name);
        },
    );

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
