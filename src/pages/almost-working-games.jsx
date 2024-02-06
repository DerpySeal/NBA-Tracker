import React, { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../components/game";
import getFormattedDate from "../misc/date-utils";
import { useLocation } from "react-router-dom";

export const GamesPage = () => {
  const location = useLocation();
  const numericalValue = location.state ? location.state.numericalValue : 0;
  const [gamesReal, setGamesReal] = useState({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const apiUrl = `https://www.balldontlie.io/api/v1/games?start_date=${getFormattedDate()}&end_date=${getFormattedDate()}&numericalValue=${numericalValue}`;
        const response = await axios.get(apiUrl);
        setGamesReal(response.data);
      } catch (error) {
        console.error("Error during API request:", error);
      }
    };

    fetchGames();
  }, [numericalValue]);

  return (
    <div className="game-body">
      {gamesReal.data && Array.isArray(gamesReal.data) ? (
        gamesReal.data.map((game, index) => (
          <div key={index}>
            {console.log(game)}
            <Game gameData={game} />
          </div>
        ))
      ) : (
        <p>No games data available</p>
      )}
    </div>
  );
};

export default GamesPage;
