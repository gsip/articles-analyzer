import React, { useEffect, useMemo, useState } from 'react';
import { NEREntity } from '@reservoir-dogs/model';
import { getArticlesMeta, ArticleMeta } from '@reservoir-dogs/articles-search';

type Props = {
    words: NEREntity[];
};

export function Articles({ words }: Props): React.ReactElement {
    const [articlesMeta, setArticlesMeta] = useState<ArticleMeta[]>([]);
    const mainKeywords = useMemo(() => {
        const mainKeywords = words
            .filter(({ count }) => count > 2)
            .sort((a, b) => (a.count < b.count ? 1 : -1))
            .map(({ word }) => word);

        return [...new Set(mainKeywords)].slice(0, 4);
    }, [words]);

    useEffect(() => {
        // console.log(words.filter(({ count }) => count > 2).sort((a, b) => (a.count < b.count ? 1 : -1)));
        // console.log(mainKeywords);
        // FIXME [AS-75] move getArticlesMeta to background script?
        getArticlesMeta(mainKeywords, 'nytimes.com').then(setArticlesMeta);
    }, [mainKeywords]);

    return (
        <div className="articles">
            <h3>See also</h3>
            <div>
                {articlesMeta.map(({ title, url, summary }) => (
                    <div key={title}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <div>
                                <h4>{title}</h4>
                                <span>{new URL(url).host}</span>
                                <div className="summary">{summary}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
