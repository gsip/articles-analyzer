import { findParserByURL } from './parsersBySites';

export const parseMainContent = (document: Document, url: string): string => {
    const parser = findParserByURL(url);

    return parser(document);
};
