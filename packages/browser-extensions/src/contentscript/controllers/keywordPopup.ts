import { messenger } from '@reservoir-dogs/browser-transport';
import { WikiSummary } from '../../modules/wikipedia';
import { removePopupAfterMouseOut, showPopup } from '../../modules/hover-popup';
import { keywordHover } from '@reservoir-dogs/model';

export const initializeKeywordPopup = (): void => {
    document.addEventListener('mouseover', async (event) => {
        const eventTarget = event.target as HTMLElement;

        if (!eventTarget || !eventTarget.classList || !eventTarget.classList.contains('articles-summary-keyword')) {
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
