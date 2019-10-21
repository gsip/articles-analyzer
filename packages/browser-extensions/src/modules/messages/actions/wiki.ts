/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WikiData } from '../../types';

export enum WikiType {
    WIKI_REQUEST = 'WIKI_REQUEST',
    WIKI_RESPONSE = 'WIKI_RESPONSE',
}

export function wikiRequest(term: string) {
    return {
        type: WikiType.WIKI_REQUEST,
        payload: term,
    } as const;
}

export function wikiResponse(wikiData: WikiData) {
    return {
        type: WikiType.WIKI_RESPONSE,
        payload: wikiData,
    } as const;
}

export type WikiActionsType = ReturnType<typeof wikiRequest> | ReturnType<typeof wikiResponse>;
