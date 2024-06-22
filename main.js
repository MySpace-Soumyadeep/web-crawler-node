const { crawlPage } = require("./crawl");

async function main(){
    if(process.argv.length < 3){
        console.log("no website found");
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("too many command line agrs");
        process.exit(1)
    }

    const baseUrl = process.argv[2]

    console.log(`STARTING CRAWL FOR ${baseUrl}`);

    const pages = await crawlPage(baseUrl, baseUrl, {})

    // console.log({pages});

    for(const page of Object.entries(pages)){
        console.log(page);
    }
}

main()