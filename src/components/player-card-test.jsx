import React from "react";
import { COLORS } from "../misc/team-colors";
import { LOGOS } from "../misc/logos";

export const PlayerCard = (props) => {
  var firstColor;
  var secondColor;
  var thirdColor;
  var teamLogo;

  try {
    const teamName = props.playerInfo.team.full_name;

    const color = Object.entries(COLORS).map(([key, value]) => {
      if (key === teamName) {
        firstColor = value[0];
        secondColor = value[1];
        thirdColor = value[2];
        return value;
      }
    });

    const logo = Object.entries(LOGOS).map(([key, value]) => {
      if (key === teamName) {
        teamLogo = value;
        return value;
      }
    });
  } catch (error) {
    console.log("Logo / Color error");
  }

  console.log(teamLogo);

  return (
    <div>
      {props.playerData && props.playerInfo ? (
        <div className="container player-card">
          <div className="row">
            <div
              className="col-sm-4 pt-3 background-logo"
              style={{ backgroundImage: `url(${teamLogo})` }}
            ></div>
            <div className="col-sm-4 pt-3 forward test">
              <h1 className="player-name bebas-neue-regular">
                <b>{props.playerInfo.first_name}</b>
              </h1>
              <h1 className="player-name bebas-neue-regular">
                <b>{props.playerInfo.last_name}</b>
              </h1>
              <div className="row py-3">
                <span>
                  <h3 className="player-card-h3">
                    {props.playerInfo.team.full_name}
                  </h3>
                  <h3 className="player-card-h3 mx-2">|</h3>
                  <h3 className="player-card-h3">
                    {props.playerInfo.position}
                  </h3>
                </span>
              </div>
              <div className="row pb-3">
                <div className="col">
                  <h1>Height</h1>
                  <h2>{`${props.playerInfo.height_feet}'${props.playerInfo.height_inches}"`}</h2>
                </div>
                <div className="col">
                  <h1>Weight</h1>
                  <h2>{`${props.playerInfo.weight_pounds} lbs.`}</h2>
                </div>
              </div>
            </div>
            <div className="col-sm-7 ms-5">
              <div className="row justify-content-between my-4">
                <div
                  className="col-sm-3 p-5 stat-square"
                  style={{ background: firstColor }}
                >
                  <h1>{props.playerData.pts}</h1>
                  <h2>PTS</h2>
                </div>
                <div
                  className="col-sm-3 p-5 stat-square"
                  style={{ background: secondColor }}
                >
                  <h1>{props.playerData.reb}</h1>
                  <h2>REB</h2>
                </div>
                <div
                  className="col-sm-3 p-5 stat-square"
                  style={{ background: thirdColor }}
                >
                  <h1>{props.playerData.ast}</h1>
                  <h2>AST</h2>
                </div>
              </div>
              <div className="row justify-content-between my-4">
                <div
                  className="col-sm-3 p-5 stat-square"
                  style={{ borderColor: firstColor }}
                >
                  <h1 className="letter-border">
                    {(props.playerData.fg_pct * 100).toFixed(1)}
                  </h1>
                  <h2>FG%</h2>
                </div>
                <div
                  className="col-sm-3 p-5 stat-square"
                  style={{ borderColor: secondColor }}
                >
                  <h1>{(props.playerData.fg3_pct * 100).toFixed(1)}</h1>
                  <h2>3PT%</h2>
                </div>
                <div
                  className="col-sm-3 p-5 stat-square"
                  style={{ borderColor: thirdColor }}
                >
                  <h1 className="letter-border">
                    {(props.playerData.ft_pct * 100).toFixed(1)}
                  </h1>
                  <h2>FT%</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
