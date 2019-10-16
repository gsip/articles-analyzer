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

const commonParser = (document: Document): string => {
    const articles = Array.from(document.querySelectorAll('article'));
    const articlesContent = articles
        .map(getHTMLStringContent)
        .filter((article): article is string => article !== null && article !== '');

    return articlesContent.join(' ');
};

const parserByURLS: ParserByURL[] = [
    {
        url: /bbc.com/,
        parser: (document) => {
            const articles = Array.from(document.querySelectorAll('.column--primary'));
            const articlesContent = articles
                .map(getHTMLStringContent)
                .filter((article): article is string => article !== null && article !== '');

            return articlesContent.join(' ');
        },
    },
];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => {
        return url.search(parser.url) !== -1;
    });

    return parserByURL ? parserByURL.parser : commonParser;
};
