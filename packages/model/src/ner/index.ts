export const NERConfig = Object.freeze({
    PERSON: {
        color: 'magenta',
        description: 'People, including fictional.',
    },
    NORP: {
        color: 'none',
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
        color: 'none',
        description: 'Titles of books, songs, etc.',
    },
    LAW: {
        color: 'none',
        description: 'Named documents made into laws.',
    },
    LANGUAGE: {
        color: 'none',
        description: 'Any named language.',
    },
    DATE: {
        color: 'none',
        description: 'Absolute or relative dates or periods.',
    },
    TIME: {
        color: 'none',
        description: 'Times smaller than a day.',
    },
    PERCENT: {
        color: 'none',
        description: 'Percentage, including ”%“.',
    },
    MONEY: {
        color: 'none',
        description: 'Monetary values, including unit.',
    },
    QUANTITY: {
        color: 'none',
        description: 'Measurements, as of weight or distance.',
    },
    ORDINAL: {
        color: 'none',
        description: '“first”, “second”, etc.',
    },
    CARDINAL: {
        color: 'none',
        description: 'Numerals that do not fall under another type.',
    },
});
