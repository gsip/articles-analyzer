import React from 'react';

type Props = {
    summary: string;
};

export function Summary({ summary }: Props): React.ReactElement {
    return (
        <>
            <h3 className="title">Summary</h3>
            <p className="summary">
                {summary
                    .split('\\n')
                    .filter(Boolean)
                    .map((text, i) => {
                        return (
                            <div className="row" key={i}>
                                {text}
                            </div>
                        );
                    })}
            </p>
        </>
    );
}
