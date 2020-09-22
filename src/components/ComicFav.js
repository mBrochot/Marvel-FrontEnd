import React, { useEffect, useState } from "react";
import axios from "axios";

import loading from "../images/loading.svg";

const ComicFav = ({ id, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [pic, setPic] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-back-end.herokuapp.com/comic?id=${id}`
      );

      setData(response.data.data.results[0]);
      setPic(
        response.data.data.results[0].thumbnail.path +
          "/portrait_incredible." +
          response.data.data.results[0].thumbnail.extension
      );
    };
    setIsLoading(false);
    fetchData();
  }, [id]);
  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <div className="comic-fav" key={index}>
      <img src={pic} alt="" />
      <div>
        <h3>{data.title}</h3>
      </div>
    </div>
  );
};

export default ComicFav;
