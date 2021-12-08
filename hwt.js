const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
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
   let teamsArr = $(".match-info.match-info-MATCH .team");
   let WTeamName;
   for(let i = 0 ; i < teamsArr.length ; i++)
   {
       let hasclass = $(teamsArr[i]).hasClass("team-gray");
       if(hasclass == false)
       {
           let teamNameElem = $(teamsArr[i]).find(".name");
           //console.log(teamNameElem.text());
           WTeamName = teamNameElem.text().trim();
       }
   }
let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");
let htmlStr ="";
for(let  i = 0 ; i < inningsArr.length ; i++)
{
    // let cHTML = $(inningsArr[i]).html();
    // htmlStr +=cHTML;
    // console.log(htmlStr);
    let teamNameEle = $(inningsArr[i]).find(".header-title.label");
    let teamName = teamNameEle.text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();
   // console.log(teamName);
   let hwtName = "";
   let hwt = 0;
    if(WTeamName ==teamName)
    {
        console.log(teamName);

        let tableElem = $(inningsArr[i]).find(".table.bowler");
        let allBowlers = $(tableElem).find("tr");
        for(let j = 0 ; j < allBowlers.length ; j++)
        {
           let allColsofPlayers =  $(allBowlers[j]).find("td");
           let playerName = $(allColsofPlayers[0]).text();
           let wickets = $(allColsofPlayers[4]).text();
          // console.log(`Winning Team ${WTeamName} player Name ${playerName} wickets ${wickets}`);
          if(wickets >= hwt)
          {
              hwt = wickets;
              hwtName = playerName;
          }
          
        }
        console.log(hwt,hwtName);
    }
}
}