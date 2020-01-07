import React, { useState, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { ColorType, wantToChangeKeywordsHighlightColor } from '@reservoir-dogs/model';
import { messenger } from '@reservoir-dogs/browser-transport';
import './Settings.scss';

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
                    onChange={useCallback(() => setActiveColorType(ColorType.MONO), [])}
                />
                <span>Gray </span>
            </label>
            <label>
                <input
                    name="highlight-page-color"
                    type="radio"
                    checked={colorType === ColorType.MULTI}
                    onChange={useCallback(() => setActiveColorType(ColorType.MULTI), [])}
                />
                <span>Multi</span>
            </label>
        </div>
    );
}

type Props = RouteComponentProps & { activeColorType: ColorType };

export function Settings({ activeColorType }: Props): React.ReactElement {
    return (
        <div>
            <HighlightColor activeColorType={activeColorType} />
        </div>
    );
}
