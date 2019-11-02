import Mark from 'mark.js';

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
    instance.mark(words, {
        element: 'span',
        className: `articles-summary-keyword ${className}`,
        accuracy: 'exactly',
        separateWordSearch: false,
    });
}

export function colorizeWords(htmlElements: HTMLElement[], words: string[], color: string): void {
    const className = `mark-${color.replace('#', '')}`;
    const style = `.${className} { border-bottom: 2px solid ${color} !important; }`;
    addStyle(style);

    htmlElements.forEach((htmlElement) => {
        addClassNameToWords(htmlElement, words, className);
    });
}
