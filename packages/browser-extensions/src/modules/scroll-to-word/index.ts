type WordInfo = {
    selector: string;
    word: string;
};

type LastWord = {
    word: string;
    index: number;
};

const lastWord: LastWord = { word: '', index: 0 };

const findByTextContent = (word: string, selector: string): Element[] => {
    const wordElements = Array.from(document.querySelectorAll(selector));
    return wordElements.filter((wordElement) => wordElement.textContent === word);
};

const highlight = (element: Element): void => {
    element.addEventListener('animationend', () => element.classList.remove('after-scroll'));
    element.classList.add('after-scroll');
};

export const scrollToWord = ({ selector, word }: WordInfo): void => {
    const words = findByTextContent(word, selector);

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

    const wordElement = words[lastWord.index];

    wordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    highlight(wordElement);
};
