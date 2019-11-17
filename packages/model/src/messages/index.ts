/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { NEREntities } from '../ner';

export enum ContentPageEvent {
    KEYWORD_HOVER = 'KEYWORD_HOVER',
    KEYWORD_POPUP_CLICK = 'KEYWORD_POPUP_CLICK',
}

export enum PopupPageEvent {
    WANT_TO_GET_SIMILAR_ARTICLES = 'WANT_TO_GET_SIMILAR_ARTICLES',
}

export function keywordHover(title: string) {
    return {
        type: ContentPageEvent.KEYWORD_HOVER,
        payload: title,
    } as const;
}

export function keywordPopupClick(title: string) {
    return {
        type: ContentPageEvent.KEYWORD_POPUP_CLICK,
        payload: title,
    } as const;
}

export function wantToGetSimilarArticles(nerEntities: NEREntities) {
    return {
        type: PopupPageEvent.WANT_TO_GET_SIMILAR_ARTICLES,
        payload: nerEntities,
    } as const;
}
