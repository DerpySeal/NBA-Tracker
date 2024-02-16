import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getPlayerAvg, getPlayerInfo } from "../misc/stats-utils";
import { PlayerCard } from "../components/player-card";

export const Players = () => {
  const [inputText, setInputText] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [playerInfo, setPlayerInfo] = useState(null);
  const [displayInfo, setDisplayInfo] = useState(true);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = async (e) => {
    if (e.key === "Enter") {
      const playerInformation = await getPlayerInfo(inputText);
      if (playerInformation != null) {
        setPlayerInfo(playerInformation);
        setDisplayInfo(true);
      } else {
        setDisplayInfo(false);
        setInputText("");
        return false;
      }
      const playerAvg = await getPlayerAvg(inputText);
      if (playerAvg != undefined) {
        setPlayerData(playerAvg);
        setDisplayInfo(true);
      } else {
        setDisplayInfo(false);
        setInputText("");
        return false;
      }
      setInputText("");
    }
  };

  return (
    <div>
      <h1 className="my-3">Active Player Search</h1>
      <div className="search-container mt-4">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          className="player-search ps-5 montserrat"
          placeholder="Search"
          onChange={handleInputChange}
          value={inputText}
          onKeyDown={handleEnterPress}
        />
      </div>
      <div className="mt-5">
        {displayInfo ? (
          <PlayerCard playerData={playerData} playerInfo={playerInfo} />
        ) : (
          <h1>Player Not Found. Check Spelling.</h1>
        )}
      </div>
    </div>
  );
};
