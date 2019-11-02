/* eslint-disable @typescript-eslint/explicit-function-return-type */

export enum ParsePageType {
    PARSE_PAGE_REQUEST = 'PARSE_PAGE_REQUEST',
}

export function parsePageRequest() {
    return {
        type: ParsePageType.PARSE_PAGE_REQUEST,
        payload: undefined,
    } as const;
}

export type ParsePageActionsType = ReturnType<typeof parsePageRequest>;
