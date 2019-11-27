import htmlToText from 'html-to-text';

const deleteNonASCIICharacters = (text: string): string => {
    // eslint-disable-next-line no-control-regex,no-useless-escape
    const NON_ASCII_CHARACTERS = /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g;

    return text.replace(NON_ASCII_CHARACTERS, '');
};

export const getHTMLStringContent = (outerHTML: string, options: HtmlToTextOptions = {}): string => {
    const ignoredSelectors = options.ignoredSelectors || [];
    const text =
        htmlToText.fromString(outerHTML, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true,
            preserveNewlines: true,
            ...options,
            ignoredSelectors: ['figure', ...ignoredSelectors],
        }) || '';

    return deleteNonASCIICharacters(text);
};

export const getText = (outerHTMLs: string[], options: HtmlToTextOptions = {}): string => {
    const content = outerHTMLs
        .map((outerHTML) => getHTMLStringContent(outerHTML, options))
        .filter((text) => text !== '');

    return content.join(' ').trim();
};

export function deleteElements(
    element: Element,
    elementsToDelete: HTMLCollectionOf<Element> | NodeListOf<Element>,
): Element {
    for (let i = elementsToDelete.length - 1; i >= 0; i--) {
        if (elementsToDelete[i].getAttribute('id') != 'a') {
            const parentNode = elementsToDelete[i].parentNode;
            if (parentNode) {
                parentNode.removeChild(elementsToDelete[i]);
            }
        }
    }

    return element;
}

export function deleteElementsBySelector(element: Element, selector: string): Element {
    const elementsToDelete = element.querySelectorAll(selector);
    return deleteElements(element, elementsToDelete);
}

export function deleteElementsByTagName(element: Element, selector: string): Element {
    const elementsToDelete = element.getElementsByTagName(selector);
    return deleteElements(element, elementsToDelete);
}

export const getHtmlElements = (doc: Document | Element, selector: string): HTMLElement[] => {
    return Array.from(doc.querySelectorAll(selector)) || [];
};

export function getPunctuationMarksNumber(element: Element): number {
    const blocksSeparatedPunctuationMarks = element.textContent ? element.textContent.split(/[,.!?;:]/) : [];
    return blocksSeparatedPunctuationMarks.length;
}
