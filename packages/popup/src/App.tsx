import React, { useEffect, useState } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { NERConfig, NEREntity } from '@reservoir-dogs/model';
import { Word } from './components/word';
import { parsePageResponse, parsePageRequest } from '@reservoir-dogs/model';
import './styles.scss';

type NEREntities = [string, NEREntity[] | undefined][];

export const App: React.FC = () => {
    const [entities, setEntities] = useState<NEREntities>([]);
    const [summary] = useState('');

    useEffect(() => {
        (async () => {
            const response = await messenger.sendToActiveTab<ReturnType<typeof parsePageResponse>>(parsePageRequest());

            if (response && response.payload) {
                const entities: NEREntities = Object.entries(response.payload);

                setEntities(entities);
            } else {
                console.error('Error: Response Is Empty');
            }
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
                        .filter(([entityName, words]) => {
                            const entity = NERConfig[entityName as keyof typeof NERConfig];

                            return entity && words !== undefined;
                        })
                        .map(([entityName, words]) => {
                            const entity = NERConfig[entityName as keyof typeof NERConfig];
                            return (
                                <div key={entityName}>
                                    <h4>{entityName}</h4>
                                    <p>{entity.description}</p>
                                    {(words as NEREntity[]).map(({ word }) => {
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
