import axios from "axios";

const ballApiKey = process.env.REACT_APP_BALLDONTLIE_API_KEY;
const headers = {
  authorization : "773e952a-f189-46ca-9424-341dd85b4d35"
};

//Returns a list of 25 players' stats for any game given the games' id
export const getGame = async (gameID) => {
  try {
    const apiUrl = `https://api.balldontlie.io/v1/stats?game_ids[]=${gameID}`;
    const response = await axios.get(apiUrl, { headers });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error; 
  }
};

//Returns home or away ID to determine if a player is on the home or away team; pickPlayer helper function
export const hoaID = (data, hoa) => {
  if (hoa === "home") {
    return data[0].game.home_team_id;
  } else if (hoa === "away") {
    return data[0].game.visitor_team_id;
  }
};

//Returns object for top player name and stats for team; Currently used to display top 
//player performances on game component
export const pickPlayer = async (gameID, hoa) => {
  const topPlayerObj = new Object();
  const data = await getGame(gameID);

  if (data.length < 1) {
    topPlayerObj.name = "-";
    topPlayerObj.pts = "-";
    topPlayerObj.ast = "-";
    topPlayerObj.reb = "-";
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

//Function to expanded game stats; Will cycle through every recorded player in a game and return their stats
export const expandStats = async (gameID, hoa) => {
  const data = await getGame(gameID);
  let teamArr = [];
  const teamID = hoaID(data, hoa);

  for (var i = 0; i < data.length; i++) {
    if (data[i].player.team_id == teamID) {
      if (data[i].min > 0) {
        teamArr.push({
          name: `${data[i].player.first_name} ${data[i].player.last_name}`,
          pts: data[i].pts,
          fg: `${data[i].fgm}/${data[i].fga}`,
          threept: `${data[i].fg3m}/${data[i].fg3a}`,
          ft: `${data[i].ftm}/${data[i].fta}`,
          reb: data[i].reb,
          ast: data[i].ast,
          stl: data[i].stl,
          blk: data[i].blk,
          min: data[i].min,
        });
      }
    }
  }

  teamArr.sort((a, b) => b.pts - a.pts);

  return teamArr;
};

//Function to split name into first and last names for player search api request
const splitName = (name) => {
  const nameArray = name.split(' ');

  const firstName = nameArray[0] || ''; // Using empty string as a default if no first name is provided
  const lastName = nameArray.slice(1).join(' ') || ''; // Join the remaining words as the last name

  return {
    firstName,
    lastName,
  };
}

//Retrive player id based on name
export const getPlayerId = async (name) => {
  const { firstName, lastName } = splitName(name)

  try {
    const apiUrl = `https://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`;
    const response = await axios.get(apiUrl, { headers });
    if (response.data.data[0].id) {
      return response.data.data[0].id;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
};

//Function that returns general player information like height, weight, position, etc. based on their name
export const getPlayerInfo = async (name) => {
  const {firstName, lastName} = splitName(name);

  try {
    const apiUrl = `https://api.balldontlie.io/v1/players?first_name=${firstName}&last_name=${lastName}`;
    const response = await axios.get(apiUrl, { headers });
    if (response.data.data[0]) {
      return response.data.data[0];
    } else {
      console.log('null from getPlayerInfo')
      return null;
    }
  } catch (error) {
    console.error("Error fetching game stats:", error);
    throw error;
  }
}

//Retrive player season averages
export const getPlayerAvg = async (name) => {
  const playerId = await getPlayerId(name);
  if (playerId > 0) {
    try {
      const apiUrl = `https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`
      const response = await axios.get(apiUrl, { headers });
      return response.data.data[0];
    } catch (error) {
      console.error("Error fetching game stats:", error);
      throw error;
    }
  } else {
    console.log("Player ID not found");
  }
};
