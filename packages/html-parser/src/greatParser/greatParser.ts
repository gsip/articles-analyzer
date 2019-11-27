import { Parser, ParserResponse } from '../types';
import { deleteElementsByTagName, deleteElementsBySelector, getText } from '../utils/parser';
import { getRootContentNode } from './rootNode';
import { getBestElement } from './recursiveParsing';

function removeNonSemanticElements(element: Element): Element {
    const clonedElement = element.cloneNode(true) as Element;

    deleteElementsByTagName(clonedElement, 'script');
    deleteElementsByTagName(clonedElement, 'figure');
    deleteElementsByTagName(clonedElement, 'iframe');
    deleteElementsByTagName(clonedElement, 'img');
    deleteElementsByTagName(clonedElement, 'header');
    deleteElementsByTagName(clonedElement, 'footer');
    deleteElementsByTagName(clonedElement, 'aside');
    deleteElementsByTagName(clonedElement, 'table');
    deleteElementsByTagName(clonedElement, 'nav');
    deleteElementsByTagName(clonedElement, 'ul');
    deleteElementsBySelector(clonedElement, '[aria-hidden=true]');

    return clonedElement;
}

export const greatParser: Parser = (doc: Document, selector?: string, options?: HtmlToTextOptions): ParserResponse => {
    const rootContentNode = getRootContentNode(doc, selector);

    const rootContentNodeWithoutNonSemanticElements = removeNonSemanticElements(rootContentNode);

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
