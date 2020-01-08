export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function deleteDuplicates<TValue>(value: TValue[]): TValue[] {
    return [...new Set<TValue>(value)];
}
