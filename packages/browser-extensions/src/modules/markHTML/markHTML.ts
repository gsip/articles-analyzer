function getStyles(rules: string[]) {
    const style = document.createElement('style');
    if (style && style.sheet) {
        rules.forEach((rule) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            style.sheet.insertRule(rule);
        });
    }

    return style;
}

function addStyles(rules: string[]): void {
    const styleElement = getStyles(rules);
    document.head.appendChild(styleElement);
}

export function generateClassNamesForMarkHTML(): void {
    const rules = [
        '.mark-event {background-color: yellow}',
        '.mark-gpe {background-color: green}',
        '.mark-person {background-color: violet}',
        '.mark-product {background-color: magenta}',
        '.mark-loc {background-color: skyblue}',
        '.mark-org {background-color: silver}',
    ];
    addStyles(rules);
}
