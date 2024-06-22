const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    /*
        baseURL: from the page we started crawl - homepage
        currentURL: current page being crawled
        pages: map of normalized urls to keep track number of times a page is crawled

     */
    console.log(`actively crawling ${currentURL}`);

    const baseUrlObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    // if it is an external url
    if(baseUrlObj.hostname !== currentURLObj.hostname) return pages

    // if page already crawled
    const normalizedCurrentURL = normalizeURL(currentURL)
    if(pages[normalizedCurrentURL] > 0){
        pages[normalizedCurrentURL]++
        return pages
    }

    // if for the first time -> initialize to 1
    pages[normalizedCurrentURL] = 1

    console.log(`actively CRAWLING page: ${currentURL}`);

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`);
            return pages
        }
        const contentType = resp.headers.get("Content-type")
        if (!contentType.includes('text/html')) {
            console.log(`non html response with content type: "${contentType}" on page: ${currentURL}`);
            return pages
        }
        
        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHtml(htmlBody, baseURL)

        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (error) {
        console.log(`error in fetch: ${error.message} on page: ${currentURL}`);
    }
    return pages
}

function getURLsFromHtml(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with relative url: ${error.message} ${baseURL}${linkElement.href}`);
            }
        }
        else {
            // absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`error with absolute url: ${error.message}`);
            }
        }
    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHtml,
    crawlPage
}