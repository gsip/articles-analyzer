import React, { useEffect, useState, useCallback } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { CommonTextResponse, parsePageRequest, keywordPopupClick, NEREntity } from '@reservoir-dogs/model';
import { PenguinLoader } from './components/penguinLoader/PenguinLoader';
import { Summary } from './components/summary/Summary';
import { Entities } from './components/entities/Entities';
import { Articles } from './components/articles/Articles';
import { NEREntities } from './types';
import './styles.scss';

const LOADER_DELAY_TIME = 150;

export const App: React.FC = () => {
    const [entities, setEntities] = useState<NEREntities>([]);
    const [summary, setSummary] = useState('');
    const [words, setWords] = useState<NEREntity[]>([]);

    const handleWordClick = useCallback((title) => messenger.sendToActiveTab(keywordPopupClick(title)), []);

    useEffect(() => {
        (async () => {
            const { ner, summary } = await messenger.sendToActiveTab<CommonTextResponse>(parsePageRequest());

            setSummary(summary);

            if (ner) {
                const entities: NEREntities = Object.entries(ner);
                const words = entities.map(([_entity, words]) => (words ? words : [])).flat();

                setEntities(entities);
                setWords(words);
            }
        })();
    }, []);

    return (
        <div className="app">
            <div className="content">
                {!summary || !entities ? (
                    <PenguinLoader delay={LOADER_DELAY_TIME} />
                ) : (
                    <>
                        <Summary summary={summary} />
                        <Entities entities={entities} onWordClick={handleWordClick} />
                        <Articles words={words} />
                    </>
                )}
            </div>
        </div>
    );
};
