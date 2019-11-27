export type ParserResponse = {
    text: string;
    htmlElements: HTMLElement[];
};

export type Parser = (
    document: Document,
    selector?: string,
    options?: { ignoredSelectors: string[] },
) => ParserResponse;

export interface ParserByURL {
    url: RegExp;
    parser: Parser;
}
