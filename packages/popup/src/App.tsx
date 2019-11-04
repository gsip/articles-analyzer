import React, { useEffect, useState, useCallback } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { NERConfig, NEREntity } from '@reservoir-dogs/model';
import { Word } from './components/word';
import { CommonTextResponse, parsePageRequest, keywordPopupClick } from '@reservoir-dogs/model';
import './styles.scss';

type NEREntities = [string, NEREntity[] | undefined][];

export const App: React.FC = () => {
    const [entities, setEntities] = useState<NEREntities>([]);
    const [summary, setSummary] = useState('');

    const onWordClick = useCallback((title) => messenger.sendToActiveTab(keywordPopupClick(title)), []);

    useEffect(() => {
        (async () => {
            const { ner, summary } = await messenger.sendToActiveTab<CommonTextResponse>(parsePageRequest());

            setSummary(summary);

            if (ner) {
                const entities: NEREntities = Object.entries(ner);

                setEntities(entities);
            }
        })();
    }, []);
    return (
        <div className="app">
            <div className="content">
                <h3 className="title">Summary</h3>
                <p className="summary">
                    {summary
                        .split('\\n')
                        .filter(Boolean)
                        .map((text, i) => {
                            return (
                                <div className="row" key={i}>
                                    {text}
                                </div>
                            );
                        })}
                </p>
                <h3>Keywords</h3>
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
                                    <p className="description">{entity.description}</p>
                                    {(words as NEREntity[]).map(({ word, count }) => {
                                        return (
                                            <Word
                                                onClick={onWordClick}
                                                word={word}
                                                title={String(count)}
                                                color={entity.color}
                                                key={word}
                                            />
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
