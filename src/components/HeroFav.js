import React, { useEffect, useState } from "react";
import axios from "axios";

import loading from "../images/loading.svg";

const HeroFav = ({ id, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [pic, setPic] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // try {
      const response = await axios.get(
        `https://marvel-back-end.herokuapp.com/character?id=${id}`
      );
      setData(response.data.data.results[0]);
      setPic(
        response.data.data.results[0].thumbnail.path +
          "/standard_fantastic." +
          response.data.data.results[0].thumbnail.extension
      );
      // } catch (error) {
      //   alert("An error occurred");
      // }
    };
    setIsLoading(false);
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <div key={index}>
      <img src={pic} alt="" />
      <div>
        <h3>{data.name}</h3>
      </div>
    </div>
  );
};

export default HeroFav;
