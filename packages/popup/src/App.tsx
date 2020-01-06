import React, { useEffect, useState, useCallback } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';
import { ArticleMeta } from '@reservoir-dogs/articles-search';
import { Router, navigate } from '@reach/router';
import {
    TextMeta,
    parsePageRequest,
    keywordPopupClick,
    wantToGetSimilarArticles,
    NEREntities,
    ColorType,
} from '@reservoir-dogs/model';
import { PenguinLoader } from './components/penguinLoader/PenguinLoader';
import { Summary } from './components/summary/Summary';
import { Entities } from './components/entities/Entities';
import { Articles } from './components/articles/Articles';
import { NavLink } from './components/NavLink';
import './styles.scss';
import { Settings } from './components/settings/Settings';

const LOADER_DELAY_TIME = 150;

export const App: React.FC = () => {
    const activeColorType = (localStorage.getItem('colorType') as ColorType) || ColorType.MONO;

    const [entities, setEntities] = useState<NEREntities>([]);
    const [summary, setSummary] = useState('');
    const [articlesMeta, setArticlesMeta] = useState<ArticleMeta[]>([]);

    const handleWordClick = useCallback((title) => messenger.sendToActiveTab(keywordPopupClick(title)), []);

    useEffect(() => {
        const path = '/' + (localStorage.getItem('path') || 'keywords');
        navigate(path);

        messenger
            .sendToActiveTab<TextMeta>(parsePageRequest(activeColorType))
            .then(({ nerEntities, summary }) => {
                setSummary(summary);

                if (!nerEntities) {
                    return [];
                }

                setEntities(nerEntities);

                return nerEntities;
            })
            .then((nerEntities) => messenger.send<ArticleMeta[]>(wantToGetSimilarArticles(nerEntities)))
            .then(setArticlesMeta);
    }, [activeColorType]);

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
                            <NavLink to="settings">Settings</NavLink>
                        </div>
                        <Router>
                            <Summary summary={summary} path="summary" />
                            <Entities entities={entities} onWordClick={handleWordClick} path="keywords" />
                            <Articles articlesMeta={articlesMeta} path="see-also" />
                            <Settings activeColorType={activeColorType} path="settings" />
                        </Router>
                    </div>
                )}
            </div>
        </div>
    );
};
