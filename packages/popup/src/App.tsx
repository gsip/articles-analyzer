import React, { useEffect, useState, useCallback } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { ArticleMeta } from '@reservoir-dogs/articles-search';
import { Router, navigate } from '@reach/router';
import {
    CommonTextResponse,
    parsePageRequest,
    keywordPopupClick,
    wantToGetSimilarArticles,
    NEREntities,
} from '@reservoir-dogs/model';
import { PenguinLoader } from './components/penguinLoader/PenguinLoader';
import { Summary } from './components/summary/Summary';
import { Entities } from './components/entities/Entities';
import { Articles } from './components/articles/Articles';
import { NavLink } from './components/NavLink';
import './styles.scss';

const LOADER_DELAY_TIME = 150;

export const App: React.FC = () => {
    const [entities, setEntities] = useState<NEREntities>([]);
    const [summary, setSummary] = useState('');
    const [articlesMeta, setArticlesMeta] = useState<ArticleMeta[]>([]);

    const handleWordClick = useCallback((title) => messenger.sendToActiveTab(keywordPopupClick(title)), []);

    useEffect(() => {
        const path = '/' + (localStorage.getItem('path') || 'keywords');
        navigate(path);

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
                    <div>
                        <div className="links">
                            <NavLink to="summary">Summary</NavLink>
                            <NavLink to="keywords">Keywords</NavLink>
                            <NavLink to="see-also">See also</NavLink>
                        </div>
                        <Router>
                            <Summary summary={summary} path="summary" />
                            <Entities entities={entities} onWordClick={handleWordClick} path="keywords" />
                            <Articles articlesMeta={articlesMeta} path="see-also" />
                        </Router>
                    </div>
                )}
            </div>
        </div>
    );
};
