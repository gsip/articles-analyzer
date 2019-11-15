import React, { useEffect, useMemo, useState } from 'react';
import { NEREntity } from '@reservoir-dogs/model';
import { getArticlesMeta, ArticleMeta } from '@reservoir-dogs/articles-search';

type Props = {
    words: NEREntity[];
};

export function Articles({ words }: Props): React.ReactElement {
    const [articlesMeta, setArticlesMeta] = useState<ArticleMeta[]>([]);
    const sortedWords = useMemo(() => {
        return words.sort((a, b) => (a.count < b.count ? 1 : -1));
    }, [words]);

    useEffect(() => {
        // FIXME [AS-75] move getArticlesMeta to background script?
        getArticlesMeta(sortedWords.map((word) => word.word).slice(0, 3)).then((articlesMeta) =>
            setArticlesMeta(articlesMeta),
        );
    }, [sortedWords]);

    return (
        <div>
            {articlesMeta.map(({ title }) => (
                <div key={title}>{title}</div>
            ))}
        </div>
    );
}
