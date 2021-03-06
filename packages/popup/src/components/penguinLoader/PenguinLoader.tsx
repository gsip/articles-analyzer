import React from 'react';
import './penguinLoader.scss';

type Props = {
    delay?: number;
};

export function PenguinLoader({ delay }: Props): React.ReactElement | null {
    const [showContent, setShowContent] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [delay]);

    if (delay && !showContent) {
        return null;
    }

    return (
        <div className="loader">
            <div className="container">
                <div className="penguin">
                    <div className="head">
                        <div className="eye eye-l" />
                        <div className="eye eye-r" />
                        <div className="beak" />
                    </div>
                    <div className="body">
                        <div className="belly" />
                        <div className="wing wing-l" />
                        <div className="wing wing-r" />
                        <div className="foot foot-l" />
                        <div className="foot foot-r" />
                    </div>
                </div>
                <div className="loading-container">
                    <h2 className="loading-text">Loading...</h2>
                </div>
            </div>
        </div>
    );
}
