import React from 'react';
import { ArticleMeta } from '@reservoir-dogs/articles-search';

type Props = {
    articlesMeta?: ArticleMeta[];
};

export function Articles({ articlesMeta }: Props): React.ReactElement | null {
    if (!articlesMeta) {
        return null;
    }

    return (
        <div className="articles">
            <h3>See also</h3>
            <div>
                {articlesMeta.map(({ title, url, summary }) => (
                    <div key={title}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <div>
                                <h4>{title}</h4>
                                <span>{url}</span>
                                <div className="summary">{summary}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
