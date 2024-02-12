import React, { useEffect, useState } from "react";
import axios from "axios";

export const Standings = () => {
  const [standingsData, setStandingsData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://api-nba-v1.p.rapidapi.com/seasons",
        headers: {
          "X-RapidAPI-Key":
            "e171c6d0-c5fa-11ee-8a58-65d78aacea1c",
          "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
        },
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setStandingsData(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  });

  return (
    <div>
      <h1>Standings lol</h1>
    </div>
  );
};
