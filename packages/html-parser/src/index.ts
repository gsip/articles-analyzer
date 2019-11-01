import { findParserByURL, ParserResponse } from './parsersBySites';

export const parseMainContent = (document: Document, url: string): ParserResponse => {
    const parser = findParserByURL(url);

    return parser(document);
};
