import { findParserByURL } from './parsersBySites';

// eslint-disable-next-line no-control-regex
const NON_ASCII_CHARACTERS = /[^\x00-\x7F]/g;

export const parseMainContent = (document: Document, url: string): string => {
    const parser = findParserByURL(url);

    return parser(document);
};

export const deleteNonASCIICharacters = (text: string): string => {
    return text.replace(NON_ASCII_CHARACTERS, '');
};
