import htmlToText from 'html-to-text';

const deleteNonASCIICharacters = (text: string): string => {
    // eslint-disable-next-line no-control-regex,no-useless-escape
    const NON_ASCII_CHARACTERS = /[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g;

    return text.replace(NON_ASCII_CHARACTERS, '');
};

const fixSiblings = (outerHTML: string): string => {
    const addSpaceAfterDivs = outerHTML.replace(/<\/div>/g, '</div></br>');
    const addSpaceBeforeDivs = addSpaceAfterDivs.replace(/<div/g, '</br><div');

    return addSpaceBeforeDivs;
};

export const getHTMLStringContent = (outerHTML: string, options: HtmlToTextOptions = {}): string => {
    const fixSiblingsOuterHTML = fixSiblings(outerHTML);

    const text =
        htmlToText
            .fromString(fixSiblingsOuterHTML, {
                wordwrap: false,
                ignoreHref: true,
                ignoreImage: true,
                preserveNewlines: true,
                uppercaseHeadings: false,
                ...options,
            })
            .replace(/\n/g, '\n ')
            .replace(/\s+/g, ' ')
            .trim() || '';

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

export function deleteElementsByTagNameAndMinTextLength(
    element: Element,
    selector: string,
    minTextLength: number,
): void {
    const elementsToDelete = element.getElementsByTagName(selector);
    const textLength = Array.from(elementsToDelete).reduce((textLength, element) => {
        return element?.textContent?.length || 0 + textLength;
    }, 0);

    if (textLength < minTextLength) {
        deleteElements(elementsToDelete);
    }
}

export const getHtmlElements = (doc: Document | Element, selector: string): HTMLElement[] => {
    return Array.from(doc.querySelectorAll(selector)) || [];
};

export function getPunctuationMarksNumber(element: Element): number {
    const blocksSeparatedPunctuationMarks = element.textContent?.split(/[,.!?;:]/) || [];
    return blocksSeparatedPunctuationMarks.length;
}
