import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Car.css";

function StarRating({ rate, hover, ratingState, hovered, addRate }) {
  const clicker = (e, ratingValue) => {
    e.preventDefault();
    rate(ratingValue);
    addRate(ratingValue);
  };
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              type="radio"
              wdawd
              name="rating"
              style={{ display: "none" }}
              value={ratingValue}
              onClick={(e) => clicker(e, ratingValue)}
            />
            <FontAwesomeIcon
              className="star"
              icon={faStar}
              color={
                ratingValue <= (hovered || ratingState) ? "#ffc107" : "#e4e5e9"
              }
              onMouseEnter={() => hover(ratingValue)}
              onMouseLeave={() => hover(0)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
