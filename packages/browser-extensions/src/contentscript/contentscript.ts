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
    BrowserEventType,
    keywordPopupClick,
} from '@reservoir-dogs/model';
import { removePopupAfterMouseOut, showPopup } from '../modules/hover-popup';
import { WikiSummary } from '../modules/wikipedia';
import { scrollToWord } from '../modules/scroll-to-word';

const initializeScrollToKeyword = (): void => {
    messenger.subscribe(
        BrowserEventType.KEYWORD_POPUP_CLICK,
        async ({ payload }: ReturnType<typeof keywordPopupClick>) => {
            scrollToWord({ selector: '.articles-summary-keyword', word: payload });
        },
    );
};

const initializeKeywordPopup = (): void => {
    document.addEventListener('mouseover', async (event) => {
        const eventTarget = event.target as HTMLElement;

        if (!eventTarget || !eventTarget.classList) {
            return;
        }

        if (!eventTarget.classList.contains('articles-summary-keyword')) {
            return;
        }

        const text = eventTarget.textContent;

        if (typeof text !== 'string') {
            return;
        }

        const { summary, url } = await messenger.send<WikiSummary>(keywordHover(text));

        const content = `
            <a class="title" target="_blank" href="${url}">${text}</a>
            <div>${summary}</div>
        `;
        const { pageX, pageY } = event;
        showPopup({ pageX, pageY }, content);
    });

    removePopupAfterMouseOut('.articles-summary-keyword');
};

const initializeParsePage = (): void => {
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
};

document.addEventListener('DOMContentLoaded', () => {
    initializeParsePage();
    initializeKeywordPopup();
    initializeScrollToKeyword();
});
