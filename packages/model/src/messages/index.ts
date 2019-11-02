/* eslint-disable @typescript-eslint/explicit-function-return-type */

export enum BrowserEventType {
    KEYWORD_HOVER = 'KEYWORD_HOVER',
}

export function keywordHover(title: string) {
    return {
        type: BrowserEventType.KEYWORD_HOVER,
        payload: title,
    } as const;
}
