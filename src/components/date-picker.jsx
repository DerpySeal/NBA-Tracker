import React, { useState } from "react";
import { convertDateFormat, calculateDaysDifference } from "../misc/date-utils";
import { useNumericalValue } from "../context/date-context";

export const DatePickerInput = (props) => {
  const { setNumericalValue } = useNumericalValue();
  const [inputText, setInputText] = useState("");

  const handleButtonClick = () => {
    // Perform some action with the text (replace this with your logic)
    const daysDiff = calculateDaysDifference(inputText)
    setNumericalValue(daysDiff)
    setInputText("");
  };

  return (
    <div className="container date-container py-4 my-3">
      <h1>{`Viewing Games For ${convertDateFormat(props.day)}`}</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-auto">
          <div className="input-group date-input" data-bs-theme="dark">
            <span class="input-group-text" id="basic-addon1">
              Select Date
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="YYYY-MM-DD"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleButtonClick}
          >
            Change Date
          </button>
        </div>
      </div>
    </div>
  );
};
