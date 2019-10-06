import Mark from 'mark.js';
import { Entity } from '../types';

function createStyleElement(rule: string): HTMLStyleElement {
    const style = document.createElement('style');
    if (style && style.sheet) {
        const sheet = style.sheet as CSSStyleSheet;
        sheet.insertRule(rule);
    }

    return style;
}

function addStyle(rule: string): void {
    const styleElement = createStyleElement(rule);
    document.head.appendChild(styleElement);
}

function addClassNameToWords(htmlElement: HTMLElement, words: string[], className: string): void {
    const instance = new Mark(htmlElement);
    instance.mark(words, { className, accuracy: 'exactly', separateWordSearch: false });
}

function colorizeWords(htmlElement: HTMLElement, words: string[], color: string): void {
    const className = `mark-${color}`;
    const style = `${className} {background-color: ${color}`;

    addStyle(style);
    addClassNameToWords(htmlElement, words, className);
}

export function colorizeEntities(htmlElement: HTMLElement, entities: Entity[], color: string): void {
    const words = entities.map((entity) => entity.word);
    colorizeWords(htmlElement, words, color);
}
