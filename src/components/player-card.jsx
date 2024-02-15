import React from "react";

export const PlayerCard = (props) => {
  return (
    <div>
      {props.playerData && props.playerInfo ? (
        <div className="container test">
        <div className="row">
          <div className="col-sm-4 pt-3 test">
            <h1 className="player-name">{props.playerInfo.first_name}</h1>
            <h2 className="player-name">{props.playerInfo.last_name}</h2>
            <div className="row py-3">
                <span>
                    <h3 className="player-card-h3">{props.playerInfo.team.full_name}</h3>
                    <h3 className="player-card-h3 mx-2">|</h3>
                    <h3 className="player-card-h3">{props.playerInfo.position}</h3>
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
              <div className="col-sm-3 p-5 test">
                <h1>{props.playerData.pts}</h1>
                <h2>PTS</h2>
              </div>
              <div className="col-sm-3 p-5 test">
                <h1>{props.playerData.reb}</h1>
                <h2>REB</h2>
              </div>
              <div className="col-sm-3 p-5 test">
                <h1>{props.playerData.ast}</h1>
                <h2>AST</h2>
              </div>
            </div>
            <div className="row justify-content-between my-4">
              <div className="col-sm-3 p-5 test">
                <h1>{(props.playerData.fg_pct * 100).toFixed(1)}</h1>
                <h2>FG%</h2>
              </div>
              <div className="col-sm-3 p-5 test">
                <h1>{(props.playerData.fg3_pct * 100).toFixed(1)}</h1>
                <h2>3PT%</h2>
              </div>
              <div className="col-sm-3 test">
                <button className="player-card-btn">See More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <h1>Enter Player Name</h1>
      )}
    </div>
  );
};
