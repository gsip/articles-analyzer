import React, { useEffect, useState } from 'react';
import { messenger } from '@reservoir-dogs/browser-transport';

import './test.scss';

export const App: React.FC = () => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        (async () => {
            // #9 create common type
            const response = await messenger.sendToActiveTab<string>({
                type: 'hello',
            });

            setStatus('Success');
        })();
    }, []);

    return <div className="app">{status}</div>;
};
