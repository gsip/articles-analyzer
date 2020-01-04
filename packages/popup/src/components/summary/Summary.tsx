import React from 'react';
import { RouteComponentProps } from '@reach/router';

type Props = RouteComponentProps & {
    summary: string;
};

export function Summary({ summary }: Props): React.ReactElement {
    return (
        <div className="summary">
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
        </div>
    );
}
