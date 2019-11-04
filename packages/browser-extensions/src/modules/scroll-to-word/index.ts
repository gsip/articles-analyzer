type WordInfo = {
    selector: string;
    word: string;
};

type LastWord = {
    word: string;
    index: number;
};

const lastWord: LastWord = { word: '', index: 0 };

export const scrollToWord = ({ selector, word }: WordInfo): void => {
    const keywordElements = Array.from(document.querySelectorAll(selector));
    const keywords = keywordElements.filter((keyword) => keyword.textContent === word);

    if (keywords.length === 0) {
        return;
    }

    if (lastWord.word === word) {
        lastWord.index += 1;

        if (lastWord.index > keywords.length - 1) {
            lastWord.index = 0;
        }
    } else {
        lastWord.word = word;
        lastWord.index = 0;
    }

    keywords[lastWord.index].scrollIntoView({ behavior: 'smooth', block: 'start' });
};
