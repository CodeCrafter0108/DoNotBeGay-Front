import { expect, test } from 'vitest';

test('Valid 1h hours value', () => {
    const date = 1730379600 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const dateWithOneHour = date + oneHour;
    const now = Date.now();

    const diff = (dateWithOneHour - now) / oneMinute;
    console.log(diff);

    expect(diff).toBeLessThan(60);
});

test('Valid 24h hours value', () => {
    const date = 1730379600 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const dateWithOneDay = date + oneDay;
    const now = Date.now();

    const diff = (dateWithOneDay - now) / oneHour;
    console.log(diff);

    expect(diff).toBeLessThan(24);
});
