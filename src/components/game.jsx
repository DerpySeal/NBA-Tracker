import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/game.css";
import { COLORS } from "../misc/team-colors";
import { LOGOS } from "../misc/logos";
import { convertToEST } from "../misc/date-utils";
import { getGame, pickPlayer, hoaID } from "../misc/stats-utils";

export const Game = (props) => {
  const [homePlayer, setHomePlayer] = useState(null);
  const [awayPlayer, setAwayPlayer] = useState(null);
  var temp;
  var temp2;
  const homeTeam = props.gameData.home_team.full_name;
  const awayTeam = props.gameData.visitor_team.full_name;
  const gameID = props.gameData.id;

  useEffect(() => {
    const fetchPlayerData = async () => {
      const home = await pickPlayer(gameID, "home");
      const away = await pickPlayer(gameID, "away");

      setHomePlayer(home);
      setAwayPlayer(away);
    };

    fetchPlayerData();
  }, [gameID]);

  if (!homePlayer || !awayPlayer) {
    return null;
  }

    const {
      name: homeName,
      pts: homePts,
      ast: homeAst,
      reb: homeReb,
    } = homePlayer;
    const {
      name: awayName,
      pts: awayPts,
      ast: awayAst,
      reb: awayReb,
    } = awayPlayer;
  
  const homeLogo = Object.entries(LOGOS).map(([key, value]) => {
    if (key === homeTeam) {
      temp = value;
      return value;
    }
  });

  const awayLogo = Object.entries(LOGOS).map(([key, value]) => {
    if (key === awayTeam) {
      temp2 = value;
      return value;
    }
  });

  const homeStatus =
    props.gameData.home_team_score > props.gameData.visitor_team_score
      ? `green`
      : `red`;
  const awayStatus =
    props.gameData.home_team_score > props.gameData.visitor_team_score
      ? `red`
      : `green`;

  const getStatus = () => {
    if (
      props.gameData.status === "Final" ||
      props.gameData.status === "1st Qtr" ||
      props.gameData.status === "2nd Qtr" ||
      props.gameData.status === "Halftime" ||
      props.gameData.status === "3rd Qtr" ||
      props.gameData.status === "4th Qtr"
    ) {
      return props.gameData.status;
    } else {
      return convertToEST(props.gameData.status);
    }
  };

  return (
    <div>
      <div className="container montserrat game-container py-4">
        <h1 className="mt-4 text-uppercase fs-2">{getStatus()}</h1>

        {/* Logos */}

        <div className="row">
          <div className="col-sm-5 align-self-center">
            <img src={temp} alt="logo" className="team-logo" />
          </div>
          <div className="col-sm-2 align-self-center">
            <h2 className="vs-h2">Vs.</h2>
          </div>
          <div className="col-sm-5 align-self-center">
            <img src={temp2} alt="logo" className="team-logo" />
          </div>
        </div>

        {/* Team Scores */}

        <div className="row justify-content-between">
          <div className="col-sm-5">
            <h2 className="team-score me-2">
              {props.gameData.home_team_score}
            </h2>
          </div>
          <div className="col-sm-5">
            <h2 className="team-score ms-2">
              {props.gameData.visitor_team_score}
            </h2>
          </div>
        </div>

        {/* Home Player of the Game */}

        <div className="row justify-content-between align-items-center mt-4">
          <div className="col inline-test">
            <h2>{homeName}</h2>
          </div>
          <div className="col inline-test">
            <h2>{`${homePts} pts`}</h2>
          </div>
          <div className="col inline-test">
            <h2>{`${homeAst} ast`}</h2>
          </div>
          <div className="col inline-test">
            <h2>{`${homeReb} reb`}</h2>
          </div>
        </div>

        {/* Away Player of the Game */}

        <div className="row justify-content-between align-items-center mt-4">
          <div className="col inline-test">
            <h2>{awayName}</h2>
          </div>
          <div className="col inline-test">
            <h2>{`${awayPts} pts`}</h2>
          </div>
          <div className="col inline-test">
            <h2>{`${awayAst} ast`}</h2>
          </div>
          <div className="col inline-test">
            <h2>{`${awayReb} reb`}</h2>
          </div>
        </div>

        <div className="row my-5">
          <div className="col">
            <button className="btn btn-primary btn-lg">
              See Full Game Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
