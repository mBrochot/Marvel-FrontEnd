import React from "react";
import { useHistory } from "react-router-dom";

import logo90 from "../images/marvel_logo90.png";
import xv3 from "../images/x-v3.png";
import allcharacters from "../images/allcharacters.jpg";

const Header = () => {
  const history = useHistory();

  return (
    <div className="header">
      <img
        className="marvel-logo90"
        src={logo90}
        alt="marvel-logo90"
        onClick={() => {
          history.push("/");
        }}
      />
      <img src={allcharacters} className="allcharacters" alt="allcharacters" />
      <img className="x-logo" src={xv3} alt="x-logo" />
      <button
        className="charac-btn"
        onClick={() => {
          history.push("/");
        }}
      >
        CHARACT
      </button>
      <button
        className="comics-btn"
        onClick={() => {
          history.push("/comics_:pageNumber");
        }}
      >
        COMICS
      </button>
      <button
        className="fav-btn"
        onClick={() => {
          history.push("/favorites");
        }}
      >
        FAV
      </button>
    </div>
  );
};

export default Header;
