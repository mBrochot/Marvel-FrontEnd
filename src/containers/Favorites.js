import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import HeroFav from "../components/HeroFav";
import ComicFav from "../components/ComicFav";
import loading from "../images/loading.svg";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [heroIdsArray, setHeroIdsArray] = useState("");
  const [comicIdsArray, setComicIdsArray] = useState("");

  useEffect(() => {
    const heroIds = Cookies.get("heroIds");
    let heroArray;
    if (heroIds) {
      heroArray = heroIds.split("-");
    }
    setHeroIdsArray(heroArray);
    const comicIds = Cookies.get("comicIds");
    let comicArray;
    if (comicIds) {
      comicArray = comicIds.split("-");
    }
    setComicIdsArray(comicArray);
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
              return (
                <HeroFav id={characterId} index={index} key={characterId} />
              );
            })}
        </div>
        <h3>Comics</h3>
        <div className="card-wrap">
          {comicIdsArray &&
            comicIdsArray.map((comicId, index) => {
              return <ComicFav id={comicId} index={index} key={comicId} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Favorites;
