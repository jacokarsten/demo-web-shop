let _runTime: Date;

/**
 * Get a token that is unique to the current time.
 * @returns A token that is unique to the current time.
 */
export function getToken(): string
{
    if (!_runTime)
    {
        // _runTime = process.env.CI ? new Date() : new Date('2025-02-23T15:14:01');
        _runTime = new Date();
    }
    return _runTime.toLocaleString('en-ZA', {
        hourCycle: 'h23',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/[/,:]/g, '').slice(0, -2);
}

/**
 * Get a token that is unique to the current time with spaces replaced by underscores.
 * @returns A token that is unique to the current time with spaces replaced by underscores.
 */
export function getUnderscoreToken(): string
{
    return getToken().replace(/\s/g, '_');
}

/**
 * Get a token that is unique to the current time with spaces replaced by underscores and numbers replaced by letters.
 * @returns A token that is unique to the current time with spaces replaced by underscores and numbers replaced by letters.
 */
export function getAlphbethicTimestampToken(): string
{
    const prepped = getToken().replace(/\s/g, '');
    return prepped.replace(/1/g, 'a').replace(/2/g, 'b').replace(/3/g, 'c').replace(/4/g, 'd').replace(/5/g, 'e')
        .replace(/6/g, 'f').replace(/7/g, 'g').replace(/8/g, 'h').replace(/9/g, 'i').replace(/0/g, 'j');
}

/**
 * Enrich an email address with a token that is unique to the current time.
 * @param email The email address to enrich.
 * @returns The enriched email address.
 */
export function enrichEmail(email: string): string
{
    return email.replaceAll('@example.com', `${getUnderscoreToken()}@example.com`);
}