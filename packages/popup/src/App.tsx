import React, { useEffect, useState } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';

import './test.scss';

// #9 change to common types
type Ner = {
    summary: string;
    ner: Map<string, Word>;
};

type Word = {
    word: string;
    count: string;
};

export const App: React.FC = () => {
    const [words, setWords] = useState([] as Word[]);
    const [summary, setSummary] = useState('');

    useEffect(() => {
        (async () => {
            // #9 create common type
            const response = await messenger.sendToActiveTab<Ner>({
                type: 'hello',
            });

            const words: Word[] = Object.values(response.ner).flat();

            setSummary(response.summary);
            setWords(words);
        })();
    }, []);

    return (
        <div className="app">
            <h1 className="title">Articles summary</h1>
            <div className="content">
                <p className="summary">{summary}</p>
                <div className="ner">
                    {words.map((word) => {
                        return (
                            <div key={word.word}>
                                <span>{word.word}</span>: <span>{word.count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
