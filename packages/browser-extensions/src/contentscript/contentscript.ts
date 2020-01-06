import { initializeScrollToKeyword } from './controllers/scrollToKeyword';
import { initializeKeywordPopup } from './controllers/keywordPopup';
import { initializeParsePage } from './controllers/parsePage';
import { initializeChangeKeywordsHighlightColor } from './controllers/changeKeywordsHighlightColor';

document.addEventListener('DOMContentLoaded', () => {
    initializeParsePage();
    initializeKeywordPopup();
    initializeScrollToKeyword();
    initializeChangeKeywordsHighlightColor();
});
