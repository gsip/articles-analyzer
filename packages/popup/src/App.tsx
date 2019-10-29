import React, { useEffect, useState } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport/dist';
import { NERConfig } from '@reservoir-dogs/model';
import { Word } from './components/word';

import './test.scss';
import { parsePageResponse, parsePageRequest } from '@reservoir-dogs/browser-transport/dist/messages/actions/parsePage';
import { Entity } from '@reservoir-dogs/browser-transport/src/types';

type Word = {
    word: string;
    count: string;
};

export const App: React.FC = () => {
    const [entities, setEntities] = useState<[string, Entity[] | undefined][]>([]);
    const [summary] = useState('');

    useEffect(() => {
        (async () => {
            const response = await messenger.sendToActiveTab<ReturnType<typeof parsePageResponse>>(parsePageRequest());
            const entities: [string, Entity[] | undefined][] = Object.entries(response.payload);
            //setSummary(response.summary);
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
                    {entities
                        .filter(([_entityName, words]) => {
                            return words !== undefined;
                        })
                        .map(([entityName, words]) => {
                            const entity = NERConfig[entityName as keyof typeof NERConfig];
                            return (
                                <div key={entityName}>
                                    <h4>{entityName}</h4>
                                    <p>{entity.description}</p>
                                    {(words as Entity[]).map(({ word }) => {
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
