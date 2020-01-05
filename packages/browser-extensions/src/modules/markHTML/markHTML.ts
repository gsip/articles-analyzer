import Mark from 'mark.js';

function addStyle(rule: string): CSSStyleSheet | undefined {
    const style = document.createElement('style');
    document.head.appendChild(style);

    if (!style.sheet) {
        return;
    }

    const sheet = style.sheet as CSSStyleSheet;
    sheet.insertRule(rule);

    return sheet;
}

let monoSheet: CSSStyleSheet | void;

export function enableMonoColorize(): void {
    const style = '.articles-summary-keyword { border-bottom: 1px solid #ccc !important; }';
    if (monoSheet) {
        monoSheet.disabled = false;
    } else {
        monoSheet = addStyle(style);
    }
}

export function disableMonoColorize(): void {
    if (monoSheet) {
        monoSheet.disabled = true;
    }
}

function addClassNameToWords(htmlElement: HTMLElement, words: string[], className: string): void {
    const instance = new Mark(htmlElement);
    instance.mark(words, {
        element: 'span',
        className: `articles-summary-keyword ${className}`,
        accuracy: {
            value: 'exactly',
            limiters: [',', '.', ':', ':', '(', ')'],
        },
        separateWordSearch: false,
    });
}

export function colorizeWords(htmlElements: HTMLElement[], words: string[], color: string): void {
    const className = `mark-${color.replace('#', '')}`;
    const style = `.${className} { border-bottom: 1px solid ${color} !important; }`;
    addStyle(style);

    htmlElements.forEach((htmlElement) => {
        addClassNameToWords(htmlElement, words, className);
    });
}
