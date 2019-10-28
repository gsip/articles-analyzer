import React, { useEffect, useState } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { NERConfig } from '@reservoir-dogs/model';
import { Word } from './components/word';

import './test.scss';

// #9 change to common types
type Ner = {
    summary: string;
    ner: Map<string, Word>;
};

type Word = {
    word: string;
    count: string;
};

export const App: React.FC = () => {
    const [entities, setEntities] = useState<[string, Word[]][]>([]);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        (async () => {
            //#9 create common type
            const response = await messenger.sendToActiveTab<Ner>({
                type: 'hello',
            });

            const entities: [string, Word[]][] = Object.entries(response.ner);

            setSummary(response.summary);
            setEntities(entities);
        })();
    }, []);

    return (
        <div className="app">
            <h1>Ebat popup</h1>
            <div className="content">
                <h3>Summary</h3>
                <p className="summary">{summary}</p>
                <h3>NER</h3>
                <div className="ner">
                    {entities.map(([entityName, words]) => {
                        const entity = NERConfig[entityName as keyof typeof NERConfig];
                        return (
                            <div key={entityName}>
                                <h4>{entityName}</h4>
                                <p>{entity.description}</p>
                                {words.map(({ word }) => {
                                    return <Word word={word} color={entity.color} key={word} />;
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
