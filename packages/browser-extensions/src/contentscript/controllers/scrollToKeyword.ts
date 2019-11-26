import { scrollToWord } from '../../modules/scroll-to-word';
import { ContentPageEvent, keywordPopupClick } from '@reservoir-dogs/model';
import { messenger } from '@reservoir-dogs/browser-transport';

export const initializeScrollToKeyword = (): void => {
    messenger.subscribe(
        ContentPageEvent.KEYWORD_POPUP_CLICK,
        async ({ payload }: ReturnType<typeof keywordPopupClick>) => {
            scrollToWord({ selector: '.articles-summary-keyword', word: payload });
        },
    );
};
