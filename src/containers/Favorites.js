import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import HeroFav from "../components/HeroFav";
import ComicFav from "../components/ComicFav";
import loading from "../images/loading.svg";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [heroIdsArray, setHeroIdsArray] = useState([]);
  const [comicIdsArray, setComicIdsArray] = useState([]);

  // console.log(heroIdsArray);
  // console.log(comicIdsArray);

  useEffect(() => {
    const heroIds = Cookies.get("heroIds");

    if (heroIds) {
      setHeroIdsArray(heroIds.split("-"));
    }
    const comicIds = Cookies.get("comicIds");

    if (comicIds) {
      setComicIdsArray(comicIds.split("-"));
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <>
      <div className="favorites">
        <h2>Favorites</h2>
        <h3>Characters</h3>
        <div className="card-wrap">
          {heroIdsArray &&
            heroIdsArray.map((characterId, index) => {
              return <HeroFav id={characterId} index={index} />;
            })}
        </div>
        <h3>Comics</h3>
        <div className="card-wrap">
          {comicIdsArray &&
            comicIdsArray.map((comicId, index) => {
              return <ComicFav id={comicId} index={index} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Favorites;
