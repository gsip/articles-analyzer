import React from 'react';

type Props = {
    word: string;
    color: string;
};

export function Word({ word, color }: Props): React.ReactElement {
    return (
        <div
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
