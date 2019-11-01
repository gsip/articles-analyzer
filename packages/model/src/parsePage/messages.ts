/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NEREntitiesBackendResponse, NEREntitiesTypesList } from '../ner';

export enum ParsePageType {
    PARSE_PAGE_REQUEST = 'PARSE_PAGE_REQUEST',
    PARSE_PAGE_RESPONSE = 'PARSE_PAGE_RESPONSE',
}

export function parsePageRequest() {
    return {
        type: ParsePageType.PARSE_PAGE_REQUEST,
        payload: undefined,
    } as const;
}

export function parsePageResponse(entities: NEREntitiesBackendResponse<NEREntitiesTypesList>) {
    return {
        type: ParsePageType.PARSE_PAGE_RESPONSE,
        payload: entities,
    } as const;
}

export type ParsePageActionsType = ReturnType<typeof parsePageRequest> | ReturnType<typeof parsePageResponse>;
