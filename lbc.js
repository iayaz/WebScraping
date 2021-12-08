const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
const request = require("request");
const cheerio = require("cheerio");
request(url,cb);
function cb(err,response,html)
{
    if(err)
    console.log(err);
    else
    extractHTML(html);
}
function extractHTML(html)
{
    let $ = cheerio.load(html);
    let elemsArr =  $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let text = $(elemsArr[0]).text();
    let htmldata = $(elemsArr[0]).html();
   
    console.log("text data",text);
    console.log("html data",htmldata);
}