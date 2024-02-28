import React, { useEffect, useState } from "react";
import axios from "axios";
import { LOGOS } from "../misc/logos";

export const Standings = () => {
  const [westArr, setWestArr] = useState();
  const [eastArr, setEastArr] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_FOOTBALL_API_KEY;
    const headers = {
      "x-apisports-key": apiKey,
    };

    //Fetches standings data and sets westArr and eastArr variables 
    const fetchData = async () => {
      try {
        const westData = [];
        const eastData = [];
        const apiurl = `https://v1.basketball.api-sports.io/standings?league=12&season=2023-2024`;
        const response = await axios.get(apiurl, { headers });

        for (let i = 0; i < 30; i++) {
          if (i < 15) {
            westData.push(response.data.response[0][i]);
          } else {
            eastData.push(response.data.response[0][i]);
          }
        }

        setWestArr(westData);
        setEastArr(eastData);
      } catch (error) {
        console.error("Error During Standings Request", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {eastArr &&
      westArr &&
      Array.isArray(eastArr) &&
      Array.isArray(westArr) ? (
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="mt-3 mb-4">West</h1>
              <table
                className="table table-striped standings-table"
                data-bs-theme="dark"
              >
                <thead>
                  <tr>
                    <th scope="col">Pos</th>
                    <th scope="col">Team</th>
                    <th scope="col">W</th>
                    <th scope="col">L</th>
                    <th scope="col">PCT</th>
                  </tr>
                </thead>
                <tbody>
                  {westArr &&
                    westArr.map((team, index) => (
                      <tr key={index}>
                        <th scope="row">{team.position}</th>
                        <th scope="row" className="text-start">
                          <img
                            src={LOGOS[team.team.name]}
                            alt="logo"
                            className="standings-logo me-2"
                          />
                          {` ${team.team.name}`}
                        </th>
                        <td>{team.games.win.total}</td>
                        <td>{team.games.lose.total}</td>
                        <td>{team.games.win.percentage}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="col-sm-6">
              <h1 className="mt-3 mb-4">East</h1>
              <table
                className="table table-striped standings-table"
                data-bs-theme="dark"
              >
                <thead>
                  <tr>
                    <th scope="col">Pos</th>
                    <th scope="col">Team</th>
                    <th scope="col">W</th>
                    <th scope="col">L</th>
                    <th scope="col">PCT</th>
                  </tr>
                </thead>
                <tbody>
                  {eastArr &&
                    eastArr.map((team, index) => (
                      <tr key={index}>
                        <th scope="row">{team.position}</th>
                        <th scope="row" className="text-start">
                          <img
                            src={LOGOS[team.team.name]}
                            alt="logo"
                            className="standings-logo me-2"
                          />
                          {` ${team.team.name}`}
                        </th>
                        <td>{team.games.win.total}</td>
                        <td>{team.games.lose.total}</td>
                        <td>{team.games.win.percentage}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : isLoading ? <h2>Loading...</h2> : (
        <h2>Standings Not Available</h2>
      )}
    </div>
  );
};
