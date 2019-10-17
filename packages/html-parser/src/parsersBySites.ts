import htmlToText from 'html-to-text';

type Parser = (document: Document) => string;

interface ParserByURL {
    url: RegExp;
    parser: Parser;
}

const getHTMLStringContent = (htmlElement: Element): string | null => {
    return htmlToText.fromString(htmlElement.outerHTML, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
    });
};

const commonParser = (document: Document, selector = 'article'): string => {
    const articles = Array.from(document.querySelectorAll(selector));
    const articlesContent = articles
        .map(getHTMLStringContent)
        .filter((article): article is string => article !== null && article !== '');

    return articlesContent.join(' ');
};

const parserByURLS: ParserByURL[] = [
    {
        url: /bbc.com/,
        parser: (document) => {
            return commonParser(document, '.column--primary');
        },
    },
    {
        url: /cnn.com/,
        parser: (document) => {
            return commonParser(document, '.l-container');
        },
    },
];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => parser.url.test(url));

    return parserByURL ? parserByURL.parser : commonParser;
};
