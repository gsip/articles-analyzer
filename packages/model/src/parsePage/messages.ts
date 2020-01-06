/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ColorType } from '../colorize';

export enum ParsePageType {
    PARSE_PAGE_REQUEST = 'PARSE_PAGE_REQUEST',
}

export function parsePageRequest(colorType: ColorType) {
    return {
        type: ParsePageType.PARSE_PAGE_REQUEST,
        payload: colorType,
    } as const;
}

export type ParsePageActionsType = ReturnType<typeof parsePageRequest>;
