/* eslint-disable @typescript-eslint/explicit-function-return-type */

export enum BrowserEventType {
    KEYWORD_HOVER = 'KEYWORD_HOVER',
    KEYWORD_POPUP_CLICK = 'KEYWORD_POPUP_CLICK',
}

export function keywordHover(title: string) {
    return {
        type: BrowserEventType.KEYWORD_HOVER,
        payload: title,
    } as const;
}

export function keywordPopupClick(title: string) {
    return {
        type: BrowserEventType.KEYWORD_POPUP_CLICK,
        payload: title,
    } as const;
}
