import Mark from 'mark.js';
import { generateClassNamesForMarkHTML } from '../modules/markHTML/markHTML';
import { parseHTML } from '../modules/parseHTML/parseHTML';

console.log('!! YES ');

document.addEventListener('DOMContentLoaded', () => {
    generateClassNamesForMarkHTML();

    const body = document.getElementsByTagName('body')[0];
    const text = parseHTML(body.outerHTML);

    chrome.runtime.sendMessage({ type: 'parseText', text }, function(response) {
        console.log('!! YES parseText', response);
        if (response && response.data) {
            const { FAC, EVENT, GPE, PERSON, PRODUCT, LOC, ORG, wikiResult } = response.data;
            const instance = new Mark(body);

            const props = { accuracy: 'exactly', separateWordSearch: false };

            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(FAC, { className: 'mark-fac', ...props });
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(EVENT, { className: 'mark-event', accuracy: 'exactly', ...props });
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(GPE, { className: 'mark-gpe', accuracy: 'exactly', ...props });
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(PERSON, { className: 'mark-person', accuracy: 'exactly', ...props });
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(PRODUCT, { className: 'mark-product', accuracy: 'exactly', ...props });
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(LOC, { className: 'mark-loc', accuracy: 'exactly', ...props });
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            instance.mark(ORG, { className: 'mark-org', accuracy: 'exactly', ...props });

            if (wikiResult) {
                console.log('!!! wikiResult', wikiResult);
            }
        }
    });
});
