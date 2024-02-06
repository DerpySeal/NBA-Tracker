import React, { PureComponent } from "react";
import axios from "axios";
import { Game } from "../components/game";
import getFormattedDate from "../misc/date-utils";
import { useNumericalValue } from "../context/date-context";

export class GamesPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gamesReal: {},
    };
  }

  
  componentDidMount() {
    const { numericalValue } = useNumericalValue();
    const apiUrl = `https://www.balldontlie.io/api/v1/games?start_date=${getFormattedDate(numericalValue)}&end_date=${getFormattedDate(numericalValue)}`;

    axios
      .get(apiUrl)
      .then((response) => {
        //console.log('Testtwo API request successful');
        this.setState({ gamesReal: response.data });
      })
      .catch((error) => {
        console.error("Error during API request:", error);
      });
  }

  render() {
    //console.log('Testtwo Render method called');
    const { gamesReal } = this.state;
    return (
      <div className="game-body">
        {gamesReal.data && Array.isArray(gamesReal.data) ? (
          gamesReal.data.map((game, index) => (
            <div key={index}>
              {/* Ensure home_team_score is not undefined before logging */}
              {console.log(game)}
              <Game gameData={game} />
            </div>
          ))
        ) : (
          <p>No games data available</p>
        )}
      </div>
    );
  }
}