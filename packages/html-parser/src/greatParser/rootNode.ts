import { getHtmlElements } from '../utils/parser';

export function getRootContentNode(doc: Document, selector?: string): Element {
    if (selector && selector.length > 0) {
        const nodeBySelector = getHtmlElements(doc, selector);
        if (nodeBySelector && nodeBySelector[0]) {
            return nodeBySelector[0];
        }
    }

    const article = getHtmlElements(doc, 'article');
    if (article && article[0]) {
        return article[0];
    }

    const main = getHtmlElements(doc, 'main');
    if (main && main[0]) {
        return main[0];
    }

    const body = getHtmlElements(doc, 'body');
    return body[0];
}
