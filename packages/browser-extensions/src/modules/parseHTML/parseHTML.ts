// @ts-ignore
import htmlToText from 'html-to-text';

export function parseHTML(outerHTML: string) {
    const text = htmlToText
        .fromString(outerHTML, {
            wordwrap: false,
            ignoreHref: true,
            ignoreImage: true,
        })
        .replace(/[^A-Za-z ]/g, '');

    return text;
}
