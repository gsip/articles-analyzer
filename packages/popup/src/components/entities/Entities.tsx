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
};

function HighlightColor(): React.ReactElement {
    const activeColorType = localStorage.getItem('colorType') as ColorType;
    const [colorType, setColorType] = useState<ColorType>(activeColorType);
    const setActiveColorType = async (colorType: ColorType): Promise<void> => {
        await messenger.sendToActiveTab(wantToChangeKeywordsHighlightColor(colorType));
        localStorage.setItem('colorType', colorType);
        setColorType(colorType);
    };

    return (
        <div className="highlight-page-color">
            <h4>Highlight page color</h4>
            <button
                className={colorType === ColorType.MONO ? 'active' : ''}
                onClick={() => setActiveColorType(ColorType.MONO)}
            >
                Mono
            </button>
            <button
                className={colorType === ColorType.MULTI ? 'active' : ''}
                onClick={() => setActiveColorType(ColorType.MULTI)}
            >
                Multi
            </button>
        </div>
    );
}

export function Entities({ entities, onWordClick }: Props): React.ReactElement {
    return (
        <div className="ner">
            <HighlightColor />
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
