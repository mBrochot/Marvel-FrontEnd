import React, { useState } from "react";
import Cookies from "js-cookie";

import loading from "../images/loading.svg";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);

  const data = Cookies.getJSON();
  //   const [getting, setGetting] = useState([]);
  //   setGetting(data);
  console.log(data.value);

  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <>
      <div className="favorites">
        <h1>Favorites</h1>
      </div>
    </>
  );
};

export default Favorites;
