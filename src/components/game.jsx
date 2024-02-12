import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/game.css";
import { COLORS } from "../misc/team-colors";
import { LOGOS } from "../misc/logos";
import { convertToEST } from "../misc/date-utils";
import { getGame, pickPlayer, hoaID, expandStats } from "../misc/stats-utils";

export const Game = (props) => {
  const [homePlayer, setHomePlayer] = useState(null);
  const [awayPlayer, setAwayPlayer] = useState(null);
  const [homeStats, setHomeStats] = useState(null);
  const [awayStats, setAwayStats] = useState(null);

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

  const handleModalStats = async () => {
    console.log(gameID);

    try {
      const [homeExpandedStats, awayExpandedStats] = await Promise.all([
        expandStats(gameID, "home"),
        expandStats(gameID, "away"),
      ]);

      setHomeStats(homeExpandedStats);
      setAwayStats(awayExpandedStats);
      console.log(homeExpandedStats);
    } catch (error) {
      console.error("Error fetching stats:", error);
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
          <div className="col-5 inline-test">
            <h2 className="shrink-text">{homeName}</h2>
          </div>
          <div className="col inline-test">
            <h2 className="shrink-text">{`${homePts} pts`}</h2>
          </div>
          <div className="col inline-test">
            <h2 className="shrink-text">{`${homeAst} ast`}</h2>
          </div>
          <div className="col inline-test">
            <h2 className="shrink-text">{`${homeReb} reb`}</h2>
          </div>
        </div>

        {/* Away Player of the Game */}

        <div className="row justify-content-between align-items-center mt-4">
          <div className="col-5 inline-test">
            <h2 className="shrink-text">{awayName}</h2>
          </div>
          <div className="col inline-test">
            <h2 className="shrink-text">{`${awayPts} pts`}</h2>
          </div>
          <div className="col inline-test">
            <h2 className="shrink-text">{`${awayAst} ast`}</h2>
          </div>
          <div className="col inline-test">
            <h2 className="shrink-text">{`${awayReb} reb`}</h2>
          </div>
        </div>

        <div className="row my-5">
          <div className="col">
            <button
              className="btn btn-primary btn-lg"
              data-bs-toggle="modal"
              data-bs-target={`#exampleModal-${gameID}`}
              onClick={handleModalStats}
            >
              See Full Game Stats
            </button>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id={`exampleModal-${gameID}`}
        tabindex="-1"
        aria-labelledby={`exampleModalLabel-${gameID}`}
        aria-hidden="true"
        data-bs-theme="dark"
      >
        <div class="modal-dialog modal-xl modal-border">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Full Game Stats
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/*Home Stats Table*/}
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-start ps-5 name-col">
                      {homeTeam}
                      <img src={temp} alt="logo" className="table-logo" />
                    </th>
                    <th scope="col">PTS</th>
                    <th scope="col">FG</th>
                    <th scope="col">3PT</th>
                    <th scope="col">FT</th>
                    <th scope="col">REB</th>
                    <th scope="col">AST</th>
                    <th scope="col">STL</th>
                    <th scope="col">BLK</th>
                    <th scope="col">MIN</th>
                  </tr>
                </thead>
                <tbody>
                  {homeStats &&
                    homeStats.map((player, index) => (
                      <tr key={index}>
                        {console.log(player)}
                        <th scope="row" className="text-start ps-5">{player.name}</th>
                        <td>{player.pts}</td>
                        <td>{player.fg}</td>
                        <td>{player.threept}</td>
                        <td>{player.ft}</td>
                        <td>{player.reb}</td>
                        <td>{player.ast}</td>
                        <td>{player.stl}</td>
                        <td>{player.blk}</td>
                        <td>{player.min}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/*Away Stats Table*/}
              <table class="table table-striped table-hover my-5">
                <thead>
                  <tr>
                    <th scope="col" className="text-start ps-5 name-col">
                      {awayTeam}
                      <img src={temp2} alt="logo" className="table-logo" />
                    </th>
                    <th scope="col">PTS</th>
                    <th scope="col">FG</th>
                    <th scope="col">3PT</th>
                    <th scope="col">FT</th>
                    <th scope="col">REB</th>
                    <th scope="col">AST</th>
                    <th scope="col">STL</th>
                    <th scope="col">BLK</th>
                    <th scope="col">MIN</th>
                  </tr>
                </thead>
                <tbody>
                  {awayStats &&
                    awayStats.map((player, index) => (
                      <tr key={index}>
                        {console.log(player)}
                        <th scope="row" className="text-start ps-5">{player.name}</th>
                        <td>{player.pts}</td>
                        <td>{player.fg}</td>
                        <td>{player.threept}</td>
                        <td>{player.ft}</td>
                        <td>{player.reb}</td>
                        <td>{player.ast}</td>
                        <td>{player.stl}</td>
                        <td>{player.blk}</td>
                        <td>{player.min}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
