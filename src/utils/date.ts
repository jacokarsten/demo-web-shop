/**
 * Formats the date (and time) to the specified format.
 * @param date The date to format.
 * @param format The format to use.
 * @returns The formatted date (and time) string.
 */
export function formatDate(date: Date, format: string): string
{
    return format
        .replace(/yyyy/g, date.getFullYear().toString().padStart(4, '0'))
        .replace(/MM/g, (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace(/dd/g, date.getDate().toString().padStart(2, '0'))
        .replace(/HH/g, date.getHours().toString().padStart(2, '0'))
        .replace(/mm/g, date.getMinutes().toString().padStart(2, '0'))
        .replace(/ss/g, date.getSeconds().toString().padStart(2, '0'))
        .replace(/fff/g, date.getMilliseconds().toString().padStart(3, '0'));
}

/**
 * Formats the current time into 'HH:mm:ss.fff'.
 * @returns The formatted current time.
 */
export function now(): string
{
    return formatDate(new Date(), 'HH:mm:ss.fff');
}