import React, { useEffect, useState } from "react";
import axios from "axios";

import loading from "../images/loading.svg";

const HeroFav = ({ id, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(
        `https://marvel-back-end.herokuapp.com/character/${id}`
      );
      try {
        console.log("hero: " + response.data.results[0]);
        setData(response.data.results[0]);
        setIsLoading(false);
      } catch (error) {
        alert("An error occurred");
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <div>
      <img src={data.thumbnail.path + `.${data.thumbnail.extension}`} alt="" />
      <div>
        <h3>{data.name}</h3>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default HeroFav;
