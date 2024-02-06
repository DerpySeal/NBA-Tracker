import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './game.css'

export const Game = (props) => {
  return (
    <div>
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card text-bg-dark p-3">
            <div class="card-body">
              <h3 className="card-title">
                {props.gameData.home_team.full_name}
              </h3>
              <h3>{props.gameData.home_team_score}</h3>
            </div>
          </div>
        </div>
        <div class="col-md-6 mx-auto">
          <div class="card text-bg-dark p-3">
            <div class="card-body">
              <h3>{props.gameData.visitor_team.full_name}</h3>
              <h3>{props.gameData.visitor_team_score}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
