import { Parser, ParserByURL } from './types';
import { greatParser } from './greatParser';

const parserByURLS: ParserByURL[] = [
    {
        url: /bbc.com/,
        parser: (document) => greatParser(document, '.column--primary'),
    },
    {
        url: /cnn.com/,
        parser: (document) => greatParser(document, '.l-container'),
    },
    {
        url: /bloomberg.com/,
        parser: (document) => greatParser(document, '.middle-column'),
    },
];

export const findParserByURL = (url: string): Parser => {
    const parserByURL = parserByURLS.find((parser) => parser.url.test(url));

    return parserByURL ? parserByURL.parser : greatParser;
};
