import { ActionReturnType, EntitiesBackendResponse, EntitiesTypesList } from '../../types';

export function extractRequest(parsedText: string) {
    return {
        type: 'EXTRACT_REQUEST' as const,
        payload: parsedText,
    } as const;
}

export function extractResponse(entities: EntitiesBackendResponse<EntitiesTypesList>) {
    return {
        type: 'EXTRACT_RESPONSE' as const,
        payload: entities,
    } as const;
}

export type ExtractActionsType = ReturnType<typeof extractRequest> | ReturnType<typeof extractResponse>;
