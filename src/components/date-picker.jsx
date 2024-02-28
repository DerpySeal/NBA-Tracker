import React, { useState } from "react";
import { convertDateFormat, calculateDaysDifference } from "../misc/date-utils";
import { useNumericalValue } from "../context/date-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export const DatePickerInput = (props) => {
  const { setNumericalValue } = useNumericalValue();
  const [inputText, setInputText] = useState("");

  const handleButtonClick = () => {
    // Perform some action with the text (replace this with your logic)
    const daysDiff = calculateDaysDifference(inputText);
    console.log(inputText);
    setNumericalValue(daysDiff);
    setInputText("");
  };

  return (
    <div className="container date-container py-4 my-3">
      {props.day != "0000-00-00" && props.day != "loading" ? (
        <h1 className="mb-4">{`${convertDateFormat(props.day)}`}</h1>
      ) : props.day === "loading" ? <h1> </h1> : (
        <h1 className="mb-4">No games found</h1>
      )}

      <div className="row justify-content-center align-items-center">
        <div className="col-auto">
          <div className="input-group date-input" data-bs-theme="dark">
            <button
              class="btn btn-lg"
              type="button"
              id="button-addon1"
              onClick={() => {
                console.log("clicked");
              }}
              //data-bs-toggle="modal"
              //data-bs-target="#exampleModal"
            >
              <FontAwesomeIcon icon={faCalendar} />
            </button>
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

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-theme="dark"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
