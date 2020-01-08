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
    console.log(monoSheet);
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
    const KEYWORD_CLASS_NAME = 'articles-summary-keyword';
    const instance = new Mark(htmlElement);
    instance.mark(words, {
        element: 'span',
        className: `${KEYWORD_CLASS_NAME} ${className}`,
        accuracy: {
            value: 'exactly',
            limiters: [',', '.', ':', ':', '(', ')'],
        },
        separateWordSearch: false,
        filter: (node) => {
            const isInsideAnotherKeyword = node?.parentElement?.className.includes(KEYWORD_CLASS_NAME);
            return !isInsideAnotherKeyword;
        },
    });
}

function generateClassName(color: string): string {
    return `mark-${color.replace('#', '')}`;
}

export function createStyleForColor(color: string): void {
    const className = generateClassName(color);
    const style = `.${className} { border-bottom: 1px solid ${color} !important; }`;
    addStyle(style);
}
export function colorizeWord(htmlElements: HTMLElement[], word: string, color: string): void {
    const className = generateClassName(color);

    htmlElements.forEach((htmlElement) => {
        addClassNameToWords(htmlElement, [word], className);
    });
}
