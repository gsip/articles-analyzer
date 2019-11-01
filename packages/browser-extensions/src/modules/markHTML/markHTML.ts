import Mark from 'mark.js';
import { NEREntity } from '@reservoir-dogs/model';

function addStyle(rule: string): void {
    const style = document.createElement('style');
    document.head.appendChild(style);

    if (!style.sheet) {
        return;
    }

    const sheet = style.sheet as CSSStyleSheet;
    sheet.insertRule(rule);
}

function addClassNameToWords(htmlElement: HTMLElement, words: string[], className: string): void {
    const instance = new Mark(htmlElement);
    instance.mark(words, { className, accuracy: 'exactly', separateWordSearch: false });
}

export function colorizeWords(htmlElement: HTMLElement, words: string[], color: string): void {
    const className = `mark-${color.replace('#', '')}`;
    const style = `.${className} {background-color: ${color}}`;

    addStyle(style);
    addClassNameToWords(htmlElement, words, className);
}
