import htmlToText from 'html-to-text';

const deleteNonASCIICharacters = (text: string): string => {
    // eslint-disable-next-line no-control-regex,no-useless-escape
    const NON_ASCII_CHARACTERS = /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g;

    return text.replace(NON_ASCII_CHARACTERS, '');
};

export const getHTMLStringContent = (outerHTML: string, options: HtmlToTextOptions = {}): string => {
    const text =
        htmlToText.fromString(outerHTML, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true,
            preserveNewlines: true,
            ...options,
        }) || '';

    return deleteNonASCIICharacters(text);
};

export const getText = (outerHTMLs: string[], options: HtmlToTextOptions = {}): string => {
    const content = outerHTMLs
        .map((outerHTML) => getHTMLStringContent(outerHTML, options))
        .filter((text) => text !== '');

    return content.join(' ').trim();
};

export function deleteElements(elementsToDelete: HTMLCollectionOf<Element> | NodeListOf<Element>): void {
    Array.from(elementsToDelete).forEach((element) => element.parentNode?.removeChild(element));
}

export function deleteElementsBySelector(element: Element, selector: string): void {
    const elementsToDelete = element.querySelectorAll(selector);
    deleteElements(elementsToDelete);
}

export function deleteElementsByTagName(element: Element, selector: string): void {
    const elementsToDelete = element.getElementsByTagName(selector);
    deleteElements(elementsToDelete);
}

export const getHtmlElements = (doc: Document | Element, selector: string): HTMLElement[] => {
    return Array.from(doc.querySelectorAll(selector)) || [];
};

export function getPunctuationMarksNumber(element: Element): number {
    const blocksSeparatedPunctuationMarks = element.textContent?.split(/[,.!?;:]/) || [];
    return blocksSeparatedPunctuationMarks.length;
}
