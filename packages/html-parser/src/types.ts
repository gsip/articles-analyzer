export type ParserResponse = {
    text: string;
    htmlElements: HTMLElement[];
};

export type Parser = (document: Document, selector?: string, options?: HtmlToTextOptions) => ParserResponse;

export interface ParserByURL {
    url: RegExp;
    parser: Parser;
}
