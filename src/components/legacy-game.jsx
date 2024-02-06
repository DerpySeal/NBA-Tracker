import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/game.css";
import { COLORS } from "../misc/team-colors";

export const Game = (props) => {
    var temp;
    var temp2;
  const homeTeam = props.gameData.home_team.full_name;
  const awayTeam = props.gameData.visitor_team.full_name;

  const homeColor = Object.entries(COLORS).map(([key, value]) => {
    if (key === homeTeam) {
        temp = value
      return value;
    }
  });

  const awayColor = Object.entries(COLORS).map(([key, value]) => {
    if (key === awayTeam) {
        temp2 = value
      return value;
    }
  });


  const homeGradient = {
    background: `linear-gradient(to bottom, ${temp}, lightgrey)`,
  };

  const awayGradient = {
    background: `linear-gradient(to bottom, ${temp2}, lightgrey)`,
  };

  const homeStatus = props.gameData.home_team_score > props.gameData.visitor_team_score ? `green` : `red`;
  const awayStatus = props.gameData.home_team_score > props.gameData.visitor_team_score ? `red` : `green`;


  return (
    <div>
      <div className="container p-4 mb-5 game-container col-sm-9">
        <div className="row">
          <div className="container col-sm-5 game-container" style={{ ...homeGradient, borderColor: homeStatus }}>
            <h3>{props.gameData.home_team.full_name}</h3>
            <h3>{props.gameData.home_team_score}</h3>
          </div>
          <div className="d-flex col-sm-2 align-items-center justify-content-center">
            <h2>{props.gameData.status}</h2>
          </div>
          <div className="container col-sm-5 game-container" style={{ ...awayGradient, borderColor: awayStatus }}>
            <h3>{props.gameData.visitor_team.full_name}</h3>
            <h3>{props.gameData.visitor_team_score}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
