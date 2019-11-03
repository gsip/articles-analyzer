import React from 'react';

type Props = {
    word: string;
    color: string;
    title?: string;
};

export function Word({ word, color, title }: Props): React.ReactElement {
    return (
        <div
            title={title}
            className="word"
            key={word}
            style={{
                backgroundColor: color,
            }}
        >
            <span>{word}</span>
        </div>
    );
}
