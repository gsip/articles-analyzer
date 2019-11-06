import { initializeScrollToKeyword } from './controllers/scrollToKeyword';
import { initializeKeywordPopup } from './controllers/keywordPopup';
import { initializeParsePage } from './controllers/parsePage';

document.addEventListener('DOMContentLoaded', () => {
    initializeParsePage();
    initializeKeywordPopup();
    initializeScrollToKeyword();
});
