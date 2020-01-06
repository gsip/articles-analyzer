/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NEREntitiesBackendResponse } from './index';

export enum ExtractType {
    EXTRACT_REQUEST = 'EXTRACT_REQUEST',
}

export function extractRequest(parsedText: string) {
    return {
        type: ExtractType.EXTRACT_REQUEST,
        payload: parsedText,
    } as const;
}

export type ExtractActionsType = ReturnType<typeof extractRequest>;

export type TextMeta = {
    ner: NEREntitiesBackendResponse;
    summary: string;
};
