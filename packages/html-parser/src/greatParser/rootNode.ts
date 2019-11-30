import { getHtmlElements } from '../utils/parser';

function getFirstHtmlElement(doc: Document, selector: string): HTMLElement {
    return getHtmlElements(doc, selector)[0];
}

export function getRootContentNode(doc: Document, selector?: string): Element {
    if (selector && selector.length > 0) {
        const nodeBySelector = getFirstHtmlElement(doc, selector);
        if (nodeBySelector) {
            return nodeBySelector;
        }
    }

    return getFirstHtmlElement(doc, 'article') || getFirstHtmlElement(doc, 'main') || getFirstHtmlElement(doc, 'body');
}
