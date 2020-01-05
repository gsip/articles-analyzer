import React from 'react';
import { Word } from '../word';
import { NERConfig, NEREntity, NEREntities, wantToChangeKeywordsHighlightColor } from '@reservoir-dogs/model';
import { RouteComponentProps } from '@reach/router';
import { messenger } from '@reservoir-dogs/browser-transport';

type Props = RouteComponentProps & {
    entities: NEREntities;
    onWordClick: (str: string) => void;
};

export function Entities({ entities, onWordClick }: Props): React.ReactElement {
    return (
        <div className="ner">
            <button
                onClick={() => {
                    messenger.sendToActiveTab(wantToChangeKeywordsHighlightColor('mono'));
                }}
            >
                Mono
            </button>
            <button
                onClick={() => {
                    messenger.sendToActiveTab(wantToChangeKeywordsHighlightColor('multi'));
                }}
            >
                Multi
            </button>
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
