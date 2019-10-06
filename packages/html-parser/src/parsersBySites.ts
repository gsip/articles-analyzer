type Parser = (document: Document) => string;

interface ParserByURL {
    url: RegExp;
    parser: Parser;
}

const getHTMLStringContent = (htmlElement: Element): string | null => {
    return htmlElement.textContent;
};

const commonParser = (document: Document): string => {
    const articles = Array.from(document.querySelectorAll('article'));
    const articlesContent = articles.map(getHTMLStringContent).filter((article): article is string => article !== null);

    return articlesContent.join(' ');
};

const parserByURLS: ParserByURL[] = [];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => {
        return url.search(parser.url) !== -1;
    });

    return parserByURL ? parserByURL.parser : commonParser;
};
