export const NERConfig = {
    PERSON: {
        color: 'magenta',
        description: 'People, including fictional.',
    },
    NORP: {
        color: '#7ae04d',
        description: 'Nationalities or religious or political groups.',
    },
    FAC: {
        color: 'peru',
        description: 'Buildings, airports, highways, bridges, etc.',
    },
    ORG: {
        color: 'mediumorchid',
        description: 'Companies, agencies, institutions, etc.',
    },
    GPE: {
        color: 'violet',
        description: 'Countries, cities, states.',
    },
    LOC: {
        color: 'silver',
        description: 'Non-GPE locations, mountain ranges, bodies of water.',
    },
    PRODUCT: {
        color: 'skyblue',
        description: 'Objects:  vehicles, foods, etc. (Not services.)',
    },
    EVENT: {
        color: 'yellow',
        description: 'Named hurricanes, battles, wars, sports events, etc.',
    },
    WORK_OF_ART: {
        color: '#e56f4a',
        description: 'Titles of books, songs, etc.',
    },
    LAW: {
        color: '#a7b6ef',
        description: 'Named documents made into laws.',
    },
    LANGUAGE: {
        color: 'd60e22',
        description: 'Any named language.',
    },
    DATE: {
        color: '#742540',
        description: 'Absolute or relative dates or periods.',
    },
    TIME: {
        color: '#479113',
        description: 'Times smaller than a day.',
    },
    PERCENT: {
        color: '#5dc4ea',
        description: 'Percentage, including ”%“.',
    },
    MONEY: {
        color: '#f7c860',
        description: 'Monetary values, including unit.',
    },
    QUANTITY: {
        color: '#856310',
        description: 'Measurements, as of weight or distance.',
    },
    ORDINAL: {
        color: '#dce137',
        description: '“first”, “second”, etc.',
    },
    CARDINAL: {
        color: '#5d8770',
        description: 'Numerals that do not fall under another type.',
    },
} as const;
