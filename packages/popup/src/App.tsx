import React, { useEffect, useState } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { NERConfig } from '@reservoir-dogs/model';

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
    const [entities, setEntities] = useState([] as [string, Word[]][]);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        (async () => {
            // #9 create common type
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
            <h1 className="title">Articles summary</h1>
            <div className="content">
                <p className="summary">{summary}</p>
                <div className="ner">
                    {entities.map(([entityName, words]) => {
                        return (
                            <div key={entityName}>
                                <h4>{entityName}</h4>
                                <p>{NERConfig[entityName].description}</p>
                                {words.map((word) => {
                                    return (
                                        <div key={word.word} style={{ backgroundColor: NERConfig[entityName].color }}>
                                            <span>{word.word}</span>: <span>{word.count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
