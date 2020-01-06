import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { ColorType, wantToChangeKeywordsHighlightColor } from '@reservoir-dogs/model';
import { messenger } from '@reservoir-dogs/browser-transport';

type Props = RouteComponentProps & { activeColorType: ColorType };

type HighlightColorProps = { activeColorType: ColorType };

function HighlightColor({ activeColorType }: HighlightColorProps): React.ReactElement {
    const [colorType, setColorType] = useState<ColorType>(activeColorType);
    // TODO move up or to global state
    const setActiveColorType = async (colorType: ColorType): Promise<void> => {
        await messenger.sendToActiveTab(wantToChangeKeywordsHighlightColor(colorType));
        localStorage.setItem('colorType', colorType);
        setColorType(colorType);
    };

    return (
        <div className="highlight-page-color">
            <h4>Highlight keywords color</h4>
            <label>
                <input
                    name="highlight-page-color"
                    type="radio"
                    checked={colorType === ColorType.MONO}
                    onChange={() => setActiveColorType(ColorType.MONO)}
                />
                <span>One </span>
            </label>
            <label>
                <input
                    name="highlight-page-color"
                    type="radio"
                    checked={colorType === ColorType.MULTI}
                    onChange={() => setActiveColorType(ColorType.MULTI)}
                />
                <span>Multi</span>
            </label>
        </div>
    );
}

export function Settings({ activeColorType }: Props): React.ReactElement {
    return (
        <div>
            <HighlightColor activeColorType={activeColorType} />
        </div>
    );
}