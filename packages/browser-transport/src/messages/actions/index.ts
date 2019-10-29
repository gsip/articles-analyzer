import { ExtractActionsType } from './extract';
import { ParsePageActionsType } from './parsePage';

export type ActionsType = ExtractActionsType | ParsePageActionsType;
