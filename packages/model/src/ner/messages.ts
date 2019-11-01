/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NEREntitiesBackendResponse, NEREntitiesTypesList } from './index';

export enum ExtractType {
    EXTRACT_REQUEST = 'EXTRACT_REQUEST',
    EXTRACT_RESPONSE = 'EXTRACT_RESPONSE',
}

export function extractRequest(parsedText: string) {
    return {
        type: ExtractType.EXTRACT_REQUEST,
        payload: parsedText,
    } as const;
}

export function extractResponse(entities: NEREntitiesBackendResponse<NEREntitiesTypesList>) {
    return {
        type: ExtractType.EXTRACT_RESPONSE,
        payload: entities,
    } as const;
}

export type ExtractActionsType = ReturnType<typeof extractRequest> | ReturnType<typeof extractResponse>;
