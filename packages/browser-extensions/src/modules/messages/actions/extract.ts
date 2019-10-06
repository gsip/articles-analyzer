/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { EntitiesBackendResponse, EntitiesTypesList } from '../../types';

export function extractRequest(parsedText: string) {
    return {
        type: 'EXTRACT_REQUEST',
        payload: parsedText,
    } as const;
}

export function extractResponse(entities: EntitiesBackendResponse<EntitiesTypesList>) {
    return {
        type: 'EXTRACT_RESPONSE',
        payload: entities,
    } as const;
}

export type ExtractActionsType = ReturnType<typeof extractRequest> | ReturnType<typeof extractResponse>;
