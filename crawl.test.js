const { normalizeURL, getURLsFromHtml } = require("./crawl")
const { test, expect } = require('@jest/globals')

// -------------------normalize url func------------------------
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
// -------------------get url from HTML func------------------------
test('getURLFromHtml absolute url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.google.com">
                Google
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL)
    const expected = ['https://www.google.com/']
    expect(actual).toEqual(expected)
})

test('getURLFromHtml relative url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Google
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL)
    const expected = ['https://www.google.com/path/']
    expect(actual).toEqual(expected)
})

test('getURLFromHtml multiple url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://www.google.com/">
                Google
            </a>
            <a href="/path1/">
                Google path 1
            </a>
            <a href="https://www.google.com/path2/">
                Google path 2
            </a>
            
        </body>
    </html>
    `

    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL)
    const expected = ['https://www.google.com/', 'https://www.google.com/path1/', 'https://www.google.com/path2/']
    expect(actual).toEqual(expected)
})

test('getURLFromHtml invalid url', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Google
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://www.google.com"
    const actual = getURLsFromHtml(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})