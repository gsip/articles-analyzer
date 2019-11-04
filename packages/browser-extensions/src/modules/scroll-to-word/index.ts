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
    const wordElements = Array.from(document.querySelectorAll(selector));
    const words = wordElements.filter((wordElement) => wordElement.textContent === word);

    if (words.length === 0) {
        return;
    }

    if (lastWord.word === word) {
        lastWord.index += 1;

        if (lastWord.index > words.length - 1) {
            lastWord.index = 0;
        }
    } else {
        lastWord.word = word;
        lastWord.index = 0;
    }

    words[lastWord.index].scrollIntoView({ behavior: 'smooth', block: 'start' });
};
