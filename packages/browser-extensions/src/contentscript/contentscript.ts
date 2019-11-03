import { parseMainContent } from '@reservoir-dogs/html-parser';
import { colorizeWords } from '../modules/markHTML/markHTML';
import { messenger } from '@reservoir-dogs/browser-transport';
import {
    extractRequest,
    keywordHover,
    ParsePageType,
    NEREntitiesTypesList,
    NEREntity,
    NERConfig,
    CommonTextResponse,
} from '@reservoir-dogs/model';
import { showPopup } from '../modules/hover-popup';

document.addEventListener('DOMContentLoaded', () => {
    messenger.subscribe(ParsePageType.PARSE_PAGE_REQUEST, async () => {
        const { text, htmlElements } = parseMainContent(document, location.href);

        if (text.length === 0) {
            return;
        }

        const response = await messenger.send<CommonTextResponse>(extractRequest(text));

        if (!response) {
            return;
        }

        const NERList = Object.entries(response.ner) as [NEREntitiesTypesList, NEREntity[] | undefined][];

        NERList.forEach(([NEREntityName, NEREntities]) => {
            const color = NERConfig[NEREntityName] ? NERConfig[NEREntityName].color : '';

            if (NEREntities && color) {
                const words = NEREntities.map((entity) => entity.word);

                colorizeWords(htmlElements, words, color);
            }
        });

        return response;
    });

    document.addEventListener('mouseover', async (event) => {
        if (!event.target) {
            return;
        }

        const eventTarget = event.target as HTMLElement;

        if (!eventTarget.classList.contains('articles-summary-keyword')) {
            return;
        }

        const text = eventTarget.textContent;

        if (typeof text !== 'string') {
            return;
        }

        const summary = await messenger.send<string>(keywordHover(text));

        showPopup(event, summary);
    });
});
