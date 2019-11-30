import { findParserByURL } from './parsersBySites';
import { ParserResponse } from './types';

export const parseMainContent = (document: Document, url: string): ParserResponse => {
    const parser = findParserByURL(url);

    return parser(document);
};
