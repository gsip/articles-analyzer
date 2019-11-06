import React from 'react';
import { Word } from '../word';
import { NERConfig, NEREntity } from '@reservoir-dogs/model';
import { NEREntities } from '../../types';

type Props = {
    entities: NEREntities;
    onWordClick: (str: string) => void;
};

export function Entities({ entities, onWordClick }: Props): React.ReactElement {
    return (
        <>
            <h3>Keywords</h3>
            <div className="ner">
                {entities
                    .filter(([entityName, words]) => {
                        const entity = NERConfig[entityName as keyof typeof NERConfig];

                        return entity && words !== undefined;
                    })
                    .map(([entityName, words]) => {
                        const entity = NERConfig[entityName as keyof typeof NERConfig];
                        return (
                            <div key={entityName}>
                                <p className="description">{entity.description}</p>
                                {(words as NEREntity[]).map(({ word, count }) => {
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
        </>
    );
}
