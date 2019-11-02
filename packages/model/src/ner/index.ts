export * from './messages';

export const NERConfig = {
    PERSON: {
        color: '#BD7CB4',
        description: 'People, including fictional.',
    },
    NORP: {
        color: '#7E6AAF',
        description: 'Nationalities or religious or political groups.',
    },
    FAC: {
        color: '#5664AF',
        description: 'Buildings, airports, highways, bridges, etc.',
    },
    ORG: {
        color: '#A4E5F1',
        description: 'Companies, agencies, institutions, etc.',
    },
    GPE: {
        color: '#39B982',
        description: 'Countries, cities, states.',
    },
    LOC: {
        color: '#03A45E',
        description: 'Non-GPE locations, mountain ranges, bodies of water.',
    },
    PRODUCT: {
        color: '#ADD68A',
        description: 'Objects:  vehicles, foods, etc. (Not services.)',
    },
    EVENT: {
        color: '#FEF100',
        description: 'Named hurricanes, battles, wars, sports events, etc.',
    },
    WORK_OF_ART: {
        color: '#EDAF3C',
        description: 'Titles of books, songs, etc.',
    },
    LAW: {
        color: '#F5A871',
        description: 'Named documents made into laws.',
    },
    LANGUAGE: {
        color: '#F58D74',
        description: 'Any named language.',
    },
    DATE: {
        color: '#F5796D',
        description: 'Absolute or relative dates or periods.',
    },
    TIME: {
        color: '#65B4F0',
        description: 'Times smaller than a day.',
    },
    PERCENT: {
        color: '#656FF0',
        description: 'Percentage, including ”%“.',
    },
    MONEY: {
        color: '#EDFC4F',
        description: 'Monetary values, including unit.',
    },
    QUANTITY: {
        color: '#FCB44F',
        description: 'Measurements, as of weight or distance.',
    },
    ORDINAL: {
        color: '#A0FB5D',
        description: '“first”, “second”, etc.',
    },
    CARDINAL: {
        color: '#5DFB69',
        description: 'Numerals that do not fall under another type.',
    },
} as const;

export interface NEREntity {
    word: string;
    count: number;
}

export type NEREntitiesTypesList = keyof typeof NERConfig;

export type NEREntitiesBackendResponse<T extends NEREntitiesTypesList = NEREntitiesTypesList> = Record<
    T,
    NEREntity[] | undefined
>;
