import React, { useCallback } from 'react';

type Props = {
    onClick: (word: string) => void;
    word: string;
    color: string;
    title?: string;
};

export function Word({ word, color, title, onClick }: Props): React.ReactElement {
    const handleClick = useCallback(() => onClick(word), [onClick, word]);

    return (
        <div
            onClick={handleClick}
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
