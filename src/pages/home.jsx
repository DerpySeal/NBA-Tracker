import React, { useEffect } from "react";
import "../styles/global.css";
import LOGO from "../misc/nba-logo-transparent.png";
import { Link } from "react-router-dom";
import { useNumericalValue } from "../context/date-context";

export const Home = () => {
  const apiKey = process.env.REACT_APP_FOOTBALL_API_KEY;
  const { setNumericalValue } = useNumericalValue();

  useEffect(() => {
    setNumericalValue(0)
  })

  const handleButtonClick = (value) => {
    // Change the numericalValue when the button is clicked
    setNumericalValue(value);
  };

  console.log(apiKey)

  return (
    <div className="tempdiv">
      <div className="d-flex container justify-content-center home-container my-5">
        <div className="row col-sm-10 py-5">
          <div className="col-sm-7 custom-col text-start pt-5">
            <h2 className="montserrat">Welcome, to</h2>
            <h1 className="home-title poppins-semibold">NBA Tracker.io</h1>
            <h6 className="montserrat small-text">Real time game tracker</h6>
            <div>
              <Link to={{ pathname: '/games', state: { numericalValue: 0 } }} onClick={() => handleButtonClick(0)}>
                <button className="btn btn-primary btn-lg my-3 me-3 montserrat">
                  View Today's Games
                </button>
              </Link>
              <Link to={{ pathname: '/games', state: { numericalValue: 1 } }} onClick={() => handleButtonClick(1)}>
                <button className="btn btn-primary btn-lg montserrat">
                  View Last Night's Games
                </button>
              </Link>
            </div>
          </div>
          <div className="col-sm-5 custom-col">
            <img className="home-logo" src={LOGO} alt="NBA Logo" />
          </div>
        </div>
      </div>
    </div>
  );
};
