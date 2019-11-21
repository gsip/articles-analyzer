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

const getHTMLStringContent = (outerHTML: string, options: HtmlToTextOptions = {}): string => {
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

const getHtmlElements = (selector: string): HTMLElement[] => {
    return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
};

const getText = (outerHTMLs: string[], options: HtmlToTextOptions = {}): string => {
    const content = outerHTMLs
        .map((outerHTML) => getHTMLStringContent(outerHTML, options))
        .filter((text) => text !== '');

    return content.join(' ').trim();
};

const commonParser = (document: Document, selector = 'article', options: HtmlToTextOptions = {}): ParserResponse => {
    const BODY_SELECTOR = 'body';
    const htmlElements = getHtmlElements(selector);
    const outerHTMLs = htmlElements.map(({ outerHTML }) => outerHTML);
    const text = getText(outerHTMLs, options);

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
        parser: (document) => commonParser(document, '.middle-column', { ignoredSelectors: ['.left-column'] }),
    },
];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => parser.url.test(url));

    return parserByURL ? parserByURL.parser : commonParser;
};
