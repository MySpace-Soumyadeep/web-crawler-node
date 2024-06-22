const { crawlPage } = require("./crawl");

function main(){
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

    crawlPage(baseUrl)
}

main()