import { PopupPageEvent, wantToChangeKeywordsHighlightColor, ColorType } from '@reservoir-dogs/model';
import { messenger } from '@reservoir-dogs/browser-transport';
import { enableMonoColorize, disableMonoColorize } from '../../modules/markHTML/markHTML';

export const initializeChangeKeywordsHighlightColor = (): void => {
    messenger.subscribe(
        PopupPageEvent.WANT_TO_CHANGE_KEYWORDS_HIGHLIGHT_COLOR,
        async ({ payload }: ReturnType<typeof wantToChangeKeywordsHighlightColor>) => {
            if (payload === ColorType.MONO) {
                enableMonoColorize();
            } else {
                disableMonoColorize();
            }
        },
    );
};
