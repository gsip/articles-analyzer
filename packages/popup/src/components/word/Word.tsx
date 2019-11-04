import React from 'react';

type Props = {
    onClick: (word: string) => unknown;
    word: string;
    color: string;
    title?: string;
};

export function Word({ word, color, title, onClick }: Props): React.ReactElement {
    return (
        <div
            onClick={() => onClick(word)}
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
