import React, { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "../components/game";
import { getFormattedApiDate } from "../misc/date-utils";
import { useNumericalValue } from "../context/date-context";
import { DatePickerInput } from "../components/date-picker";

export const GamesPage = () => {
  const { numericalValue } = useNumericalValue();
  const [gamesReal, setGamesReal] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const ballApiKey = process.env.REACT_APP_BALLDONTLIE_API_KEY;
  const headers = {
    authorization: ballApiKey,
  };

  //Loads games for either today or yesterday when the Games page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://api.balldontlie.io/v1/games?start_date=${getFormattedApiDate(
          numericalValue
        )}&end_date=${getFormattedApiDate(numericalValue)}`;
        const response = await axios.get(apiUrl, { headers });
        setGamesReal(response.data);
      } catch (error) {
        console.error("Error during API request:", error.response);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [numericalValue]);

  return (
    <div>
      <div>
        {/* Displays the date in date-picker component if there is game data available to display */}
        {gamesReal.data && gamesReal.data[0] && gamesReal.data[0].date ? (
          <DatePickerInput day={gamesReal.data[0].date} />
        ) : isLoading ? (
          <DatePickerInput day={"loading"} />
        ) : (
          <DatePickerInput day={"0000-00-00"} />
        )}
      </div>
      <div className="container">
        <div className="row">
          {/* Loops through games from gamesReal data and displays them */}
          {gamesReal.data && Array.isArray(gamesReal.data) ? (
            gamesReal.data.map((game, index) => (
              <div key={index} className="col-sm-6 my-4">
                <Game gameData={game} />
              </div>
            ))
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>No games data available</p>
          )}
        </div>
      </div>
    </div>
  );
};
