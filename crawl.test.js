const { normalizeURL } = require("./crawl")
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://www.google.com/path'

    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL trim trailing slash', () => {
    const input = 'https://www.google.com/path/'

    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL capitals', () => {
    const input = 'https://www.GooGle.com/path/'

    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL protocol', () => {
    const input = 'http://www.GooGle.com/path/'

    const actual = normalizeURL(input)
    const expected = 'www.google.com/path'
    expect(actual).toEqual(expected)
})