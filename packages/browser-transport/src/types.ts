import { ExtractActionsType } from './messages/actions/extract';

export interface ActionReturnType<T> {
    type: string;
    payload: T;
}

export type Entity = {
    word: string;
    count: number;
};

export type EntitiesBackendResponse<T extends EntitiesTypesList = EntitiesTypesList> = Record<T, Entity[] | undefined>;

export type EntitiesTypesList = 'FAC' | 'EVENT' | 'GPE' | 'PERSON' | 'PRODUCT' | 'LOC' | 'ORG';

export type MessengerCallback<P extends ExtractActionsType, R extends ExtractActionsType> = (action: P) => Promise<R>;
