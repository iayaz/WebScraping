const url =
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
request(url, cb);
function cb(err, response, html) {
  if (err) console.log(err);
  else extractHTML(html);
}
function extractHTML(html) {
  let $ = cheerio.load(html);
  let teamsArr = $(".match-info.match-info-MATCH .team");
  let WTeamName;
  for (let i = 0; i < teamsArr.length; i++) {
    let hasclass = $(teamsArr[i]).hasClass("team-gray");
    if (hasclass == false) {
      let teamNameElem = $(teamsArr[i]).find(".name");
      //console.log(teamNameElem.text());
      WTeamName = teamNameElem.text().trim();
    }
  }
  let inningsArr = $(".card.content-block.match-scorecard-table>.Collapsible");

  for (let i = 0; i < inningsArr.length; i++) {
    let teamNameEle = $(inningsArr[i]).find(".header-title.label");
    let teamName = teamNameEle.text();
    teamName = teamName.split("INNINGS")[0];
    teamName = teamName.trim();

    let tableElem = $(inningsArr[i]).find(".table.batsman");
    let allBowlers = $(tableElem).find("tr");
    for (let j = 0; j < allBowlers.length; j++) {
      let allColsofPlayers = $(allBowlers[j]).find("td");
      let isbatsManCol = $(allColsofPlayers[0]).hasClass("batsman-cell");

      if (isbatsManCol == true) {
        let href = $(allColsofPlayers[0]).find("a").attr("href");
        // console.log(`Winning Team ${WTeamName} player Name ${playerName} `);
        let fulllink ="https://www.espncricinfo.com"+ href;
        // console.log(fulllink);
        let name = $(allColsofPlayers[0]).text();
        getBirthdaypage(fulllink,name , teamName);
      }
    }
  }
}
function getBirthdaypage(url , name , teamName)
{
    request(url,cb);
    function cb(err, response ,html)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            extractBirthday(html , name , teamName);
        }
    }
}
function extractBirthday(html , name , teamName)
{
    let $ = cheerio.load(html);
    let detailsArr = $(".player-card-description");
    let birthDay  = $(detailsArr[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthDay}`);

}
