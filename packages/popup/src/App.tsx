import React, { useEffect, useState, useCallback } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { CommonTextResponse, parsePageRequest, keywordPopupClick } from '@reservoir-dogs/model';
import { Loader } from './components/loader/Loader';
import { Summary } from './components/summary/Summary';
import { Entities } from './components/entities/Entities';
import { NEREntities } from './types';
import './styles.scss';

const LOADER_DELAY_TIME = 150;

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
                {!summary || !entities ? (
                    <Loader delay={LOADER_DELAY_TIME} />
                ) : (
                    <>
                        <Summary summary={summary} />
                        <Entities entities={entities} onWordClick={onWordClick} />
                    </>
                )}
            </div>
        </div>
    );
};
