import React from 'react';
import { ArticleMeta } from '@reservoir-dogs/articles-search';
import { RouteComponentProps } from '@reach/router';

type Props = RouteComponentProps & {
    articlesMeta: ArticleMeta[];
};

const getHostname = (url: string): string => {
    try {
        return new URL(url).hostname;
    } catch (e) {
        console.error(e);
        return url;
    }
};

export function Articles({ articlesMeta = [] }: Props): React.ReactElement | string {
    if (articlesMeta.length === 0) {
        return 'Nothing found ¯\\_(ツ)_/¯';
    }

    return (
        <div className="articles">
            <div>
                {articlesMeta.map(({ title, url, summary }) => (
                    <div className="article" key={title}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <div>
                                <h4>{title}</h4>
                                <span>{getHostname(url)}</span>
                                <div className="summary">{summary}</div>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
