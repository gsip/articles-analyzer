import { getPunctuationMarksNumber } from '../utils/parser';

const MIN_TEXT_LENGTH_IN_NODE = 100;
const MAX_TEXT_LENGTH_DIFFERENCE_COEFFICIENT_TO_PREFER_CHILD = 0.6;
const MIN_PARAGRAPHS_TO_PREFER_CHILD = 2;
const MIN_PUNCTUATION_MARKS_LENGTH = 5;

type NodeMetadata = {
    deep: number;
    maxDeep: number;
    element: ChildNode;
    textLength: number;
    textWeight: number;
};

const bestResults: NodeMetadata[] = [];

function parseLeaf(element: Element, deep = 0, textWeight: number): NodeMetadata {
    return {
        deep,
        element,
        textLength: element.textContent?.length || 0,
        textWeight,
        maxDeep: deep,
    };
}

function parseNonLeaf(element: Element, deep: number, textWeight: number): NodeMetadata {
    const result = Array.from(element.children)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .map((node: Element) => parseNode(node, deep + 1))
        .filter((result): result is NodeMetadata => result !== undefined && result !== null)
        .reduce(
            (acc: NodeMetadata, nodeMetadata: NodeMetadata) => {
                return {
                    ...acc,
                    textLength: acc.textLength + nodeMetadata.textLength,
                    maxDeep: Math.max(acc.maxDeep, nodeMetadata.maxDeep),
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

function parseNode(element: Element, deep = 0): NodeMetadata | null {
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

    bestResults.sort((left, right) => right.textLength - left.textLength);

    if (!bestResults?.length) {
        return null;
    }

    const best = bestResults.reduce((best, value) => {
        const textLengthDifference = value.textLength / best.textLength;
        return textLengthDifference < MAX_TEXT_LENGTH_DIFFERENCE_COEFFICIENT_TO_PREFER_CHILD ||
            element.querySelectorAll('p').length > MIN_PARAGRAPHS_TO_PREFER_CHILD
            ? best
            : value;
    }, bestResults[0]);

    return best.element as Element;
}
