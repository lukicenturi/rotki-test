export function formatBalance(amount: number|string): string {
    if (typeof amount === 'string') {
        return formatNumber(parseFloat(amount).toFixed(2));
    }
    return formatNumber(amount.toFixed(2));
}

export function formatNumber(value: number|string): string {
    const formatter = new Intl.NumberFormat();
    return formatter.format(+value);
}

