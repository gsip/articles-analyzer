import { ActionsType } from './messages/actions';

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

export type MessengerCallback<P extends ActionsType, R extends ActionsType> = (action: P) => Promise<R>;

export interface MessengerInterface<T extends ActionsType> {
    send<P extends T, R extends T>(action: P): Promise<R>;
    subscribe<P extends T, R extends T>(actionType: P['type'], callback: MessengerCallback<P, R>): void;
}

export type WikiData = {
    summary?: string;
    imageUrl?: string;
};
