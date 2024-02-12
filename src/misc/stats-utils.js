import axios from "axios";

//Returns a list of the 25 players' stats for that game
export const getGame = async (gameID) => {
  try {
    const response = await axios.get(
      `https://www.balldontlie.io/api/v1/stats?game_ids[]=${gameID}`
    );

    //console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error; // Propagate the error to the calling component
  }
};

//Returns home or away ID; pickPlayer helper function

export const hoaID = (data, hoa) => {
  if (hoa === "home") {
    return data[0].game.home_team_id;
  } else if (hoa === "away") {
    return data[0].game.visitor_team_id;
  }
};

//Returns object for top player name and stats for team

export const pickPlayer = async (gameID, hoa) => {
  const topPlayerObj = new Object();
  const data = await getGame(gameID);

  if (data.length < 1) {
    topPlayerObj.name = '-';
    topPlayerObj.pts = '-';
    topPlayerObj.ast = '-';
    topPlayerObj.reb = '-';
  } else {
    const teamID = hoaID(data, hoa);
    var tempScore = -1;
    var tempPlayerID;
    var arrIndex;

    for (var i = 0; i < data.length; i++) {
      if (data[i].player.team_id == teamID) {
        if (data[i].pts > tempScore) {
          tempScore = data[i].pts;
          tempPlayerID = data[i].player.id;
          arrIndex = i;
        } else {
          continue;
        }
      } else {
        continue;
      }
    }
    topPlayerObj.name = `${data[arrIndex].player.first_name} ${data[arrIndex].player.last_name}`;
    topPlayerObj.pts = data[arrIndex].pts;
    topPlayerObj.ast = data[arrIndex].ast;
    topPlayerObj.reb = data[arrIndex].reb;
  }

  return topPlayerObj;
};

export const expandStats = async (gameID, hoa) => {
  const data = await getGame(gameID);
  let teamArr = [];
  const teamID = hoaID(data, hoa);


  for(var i = 0; i < data.length; i++){
    if(data[i].player.team_id == teamID) {
      if(data[i].min > 0){
        teamArr.push({name: `${data[i].player.first_name} ${data[i].player.last_name}`, pts: data[i].pts, fg: `${data[i].fgm}/${data[i].fga}`, threept: `${data[i].fg3m}/${data[i].fg3a}`, ft: `${data[i].ftm}/${data[i].fta}`, reb: data[i].reb, ast: data[i].ast, stl: data[i].stl, blk: data[i].blk, min: data[i].min})
      }
    }
  }

  teamArr.sort((a, b) => b.pts - a.pts);

  return teamArr;
}