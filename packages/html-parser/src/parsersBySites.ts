import htmlToText from 'html-to-text';

export type ParserResponse = {
    text: string;
    htmlElements: HTMLElement[];
};

type Parser = (document: Document) => ParserResponse;

interface ParserByURL {
    url: RegExp;
    parser: Parser;
}

const deleteNonASCIICharacters = (text: string): string => {
    // eslint-disable-next-line no-control-regex
    const NON_ASCII_CHARACTERS = /[^\x00-\x7F]/g;

    return text.replace(NON_ASCII_CHARACTERS, '');
};

const getHTMLStringContent = (htmlElement: HTMLElement): string => {
    const text =
        htmlToText.fromString(htmlElement.outerHTML, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true,
        }) || '';

    return deleteNonASCIICharacters(text);
};

const getHtmlElements = (selector: string): HTMLElement[] => {
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
};

const getText = (htmlElements: HTMLElement[]): string => {
    const content = htmlElements.map(getHTMLStringContent).filter((htmlElement) => htmlElement !== '');

    return content.join(' ').trim();
};

const commonParser = (document: Document, selector = 'article'): ParserResponse => {
    const BODY_SELECTOR = 'body';
    const htmlElements = getHtmlElements(selector);
    const text = getText(htmlElements);

    if (text !== '' || selector === BODY_SELECTOR) {
        return { text, htmlElements };
    }

    return commonParser(document, BODY_SELECTOR);
};

const parserByURLS: ParserByURL[] = [
    {
        url: /bbc.com/,
        parser: (document) => commonParser(document, '.column--primary'),
    },
    {
        url: /cnn.com/,
        parser: (document) => commonParser(document, '.l-container'),
    },
    {
        url: /bloomberg.com/,
        parser: (document) => {
            const htmlElements = getHtmlElements('.middle-column');

            const leftColumn = document.querySelector('.left-column');

            let text = '';
            if (leftColumn && leftColumn.parentElement) {
                const parent = leftColumn.parentElement;
                parent.removeChild(leftColumn);
                text = getText(htmlElements);
                parent.prepend(leftColumn);
            } else {
                text = getText(htmlElements);
            }

            return { text, htmlElements } || commonParser(document);
        },
    },
];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => parser.url.test(url));

    return parserByURL ? parserByURL.parser : commonParser;
};
