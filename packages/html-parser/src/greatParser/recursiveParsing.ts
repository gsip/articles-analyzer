import { getPunctuationMarksNumber } from '../utils/parser';

const MIN_TEXT_LENGTH_IN_NODE = 200;
const MAX_TEXT_LENGTH_DIFFERENCE_WHICH_PREFER_CHILD = 0.6;
const MIN_PUNCTUATION_MARKS_LENGTH = 5;

type RType = {
    deep: number;
    maxDeep: number;
    element: ChildNode;
    textLength: number;
    textWeight: number;
};

const bestResults: RType[] = [];

function parseLeaf(element: Element, deep = 0, textWeight: number): RType {
    return {
        deep,
        element,
        textLength: element.textContent ? element.textContent.length : 0,
        textWeight,
        maxDeep: deep,
    };
}

function parseNonLeaf(element: Element, deep = 0, textWeight: number): RType {
    const result = Array.from(element.children)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map((node: Element) => parseNode(node, deep + 1))
        .filter((result): result is RType => result !== undefined && result !== null)
        .reduce(
            (acc: RType, rtype: RType) => {
                return {
                    ...acc,
                    textLength: acc.textLength + rtype.textLength,
                    maxDeep: Math.max(acc.maxDeep, rtype.maxDeep),
                };
            },
            {
                deep,
                element,
                textLength: 0,
                textWeight,
                maxDeep: 0,
            },
        );

    bestResults.push(result);
    return result;
}

function parseNode(element: Element, deep = 0): RType | null {
    if (element.children.length === 0) {
        return parseLeaf(element, deep, getPunctuationMarksNumber(element));
    }

    if (element.textContent && element.textContent.length < MIN_TEXT_LENGTH_IN_NODE) {
        return null;
    }

    const punctuationMarksLength = getPunctuationMarksNumber(element);

    if (punctuationMarksLength < MIN_PUNCTUATION_MARKS_LENGTH) {
        return null;
    }

    const result = parseNonLeaf(element, deep, getPunctuationMarksNumber(element));
    bestResults.push(result);
    return result;
}

export function getBestElement(element: Element): Element | null {
    parseNode(element);

    if (bestResults.length === 0) {
        return null;
    }

    bestResults.sort((left: RType, right: RType): number => {
        return right.textLength - left.textLength;
    });

    if (!bestResults || !bestResults.length) {
        return null;
    }
    let best = bestResults[0];
    for (let i = 1; i < bestResults.length; i++) {
        if (bestResults[i].textLength / best.textLength < MAX_TEXT_LENGTH_DIFFERENCE_WHICH_PREFER_CHILD) {
            break;
        }

        best = bestResults[i];
    }

    return best.element as Element;
}
