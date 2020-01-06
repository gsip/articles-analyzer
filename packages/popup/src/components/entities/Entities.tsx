import React, { useState } from 'react';
import { Word } from '../word';
import {
    NERConfig,
    NEREntity,
    NEREntities,
    wantToChangeKeywordsHighlightColor,
    ColorType,
} from '@reservoir-dogs/model';
import { RouteComponentProps } from '@reach/router';
import { messenger } from '@reservoir-dogs/browser-transport';
import './Entities.scss';

type Props = RouteComponentProps & {
    entities: NEREntities;
    onWordClick: (str: string) => void;
    activeColorType: ColorType;
};

type HighlightColorProps = { activeColorType: ColorType };

function HighlightColor({ activeColorType }: HighlightColorProps): React.ReactElement {
    const [colorType, setColorType] = useState<ColorType>(activeColorType);
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
                <span> One </span>
            </label>
            <label>
                <input
                    name="highlight-page-color"
                    type="radio"
                    checked={colorType === ColorType.MULTI}
                    onChange={() => setActiveColorType(ColorType.MULTI)}
                />
                <span> Multi</span>
            </label>
        </div>
    );
}

export function Entities({ entities, onWordClick, activeColorType }: Props): React.ReactElement {
    return (
        <div className="ner">
            <HighlightColor activeColorType={activeColorType} />
            {entities
                .filter(([entityName, words]) => {
                    const entity = NERConfig[entityName as keyof typeof NERConfig];

                    return entity && words !== undefined;
                })
                .map(([entityName, words]) => {
                    const entity = NERConfig[entityName as keyof typeof NERConfig];
                    return (
                        <div key={entityName}>
                            <h4 className="description">{entity.description}</h4>
                            {(words as NEREntity[])
                                .sort((a, b) => (a.count < b.count ? 1 : -1))
                                .map(({ word, count }) => {
                                    return (
                                        <Word
                                            onClick={onWordClick}
                                            word={word}
                                            title={String(count)}
                                            color={entity.color}
                                            key={word}
                                        />
                                    );
                                })}
                        </div>
                    );
                })}
        </div>
    );
}
