export function isNotEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function getWithoutDuplicates<TValue>(value: TValue[]): TValue[] {
    return [...new Set<TValue>(value)];
}
