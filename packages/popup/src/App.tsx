import React, { useEffect, useState, useCallback } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import {
    CommonTextResponse,
    parsePageRequest,
    keywordPopupClick,
    wantToGetSimilarArticles,
} from '@reservoir-dogs/model';
import { PenguinLoader } from './components/penguinLoader/PenguinLoader';
import { Summary } from './components/summary/Summary';
import { Entities } from './components/entities/Entities';
import { Articles } from './components/articles/Articles';
import { NEREntities } from './types';
import './styles.scss';
import { ArticleMeta } from '@reservoir-dogs/articles-search';

const LOADER_DELAY_TIME = 150;

export const App: React.FC = () => {
    const [entities, setEntities] = useState<NEREntities>([]);
    const [summary, setSummary] = useState('');
    const [articlesMeta, setArticlesMeta] = useState<ArticleMeta[]>([]);

    const handleWordClick = useCallback((title) => messenger.sendToActiveTab(keywordPopupClick(title)), []);

    useEffect(() => {
        messenger
            .sendToActiveTab<CommonTextResponse>(parsePageRequest())
            .then(({ ner, summary }) => {
                setSummary(summary);

                if (!ner) {
                    return [];
                }

                const nerEntities = Object.entries(ner);
                setEntities(nerEntities);

                return nerEntities;
            })
            .then((nerEntities) => messenger.send<ArticleMeta[]>(wantToGetSimilarArticles(nerEntities)))
            .then(setArticlesMeta);
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
                        <Articles articlesMeta={articlesMeta} />
                    </>
                )}
            </div>
        </div>
    );
};
