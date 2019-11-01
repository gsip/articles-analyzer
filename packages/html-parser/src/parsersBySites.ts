import htmlToText from 'html-to-text';

type Parser = (document: Document) => string;

interface ParserByURL {
    url: RegExp;
    parser: Parser;
}

const deleteNonASCIICharacters = (text: string): string => {
    // eslint-disable-next-line no-control-regex
    const NON_ASCII_CHARACTERS = /[^\x00-\x7F]/g;

    return text.replace(NON_ASCII_CHARACTERS, '');
};

const getHTMLStringContent = (htmlElement: Element): string => {
    const text =
        htmlToText.fromString(htmlElement.outerHTML, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true,
        }) || '';

    return deleteNonASCIICharacters(text);
};

const commonParser = (document: Document, selector = 'article'): string => {
    const BODY_SELECTOR = 'body';
    const articles = Array.from(document.querySelectorAll(selector));
    const articlesContent = articles.map(getHTMLStringContent).filter((article) => article !== '');

    const text = articlesContent.join(' ').trim();

    if (text !== '' || selector === BODY_SELECTOR) {
        return text;
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
];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => parser.url.test(url));

    return parserByURL ? parserByURL.parser : commonParser;
};
