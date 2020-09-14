import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const handleClick = (id) => {
  let favIds = Cookies.get("favIds");
  if (!favIds) {
    const favId = `-${id}`;
    Cookies.set("favIds", favId, {
      expires: 7,
    });
  } else {
    const favIdsArray = favIds.split("-");
    const idOfHero = favIdsArray.indexOf(id.toString());
    if (idOfHero === -1) {
      Cookies.set("favIds", `${favIds}-${id}`);
    }
    if (idOfHero !== -1) {
      favIdsArray.splice(idOfHero, 1);
      const marvelFavoriteCharacters = favIdsArray.join("-");
      Cookies.set("favIds", marvelFavoriteCharacters, {
        expires: 7,
      });
    }
  }
};

const HeroCard = ({ id, name, description, thumbnail, fav }) => {
  const [favorite, setFavorite] = useState(fav);
  const history = useHistory();
  const marvelPic = `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  return (
    <>
      {thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
        <div className="hero-card">
          <FontAwesomeIcon
            className={favorite ? "plus-icon-card-r" : "plus-icon-card-w"}
            icon="plus"
            size="3x"
            onClick={() => {
              handleClick(id);
              setFavorite(!favorite);
            }}
          />
          <div
            className="Picture"
            style={{
              height: "100%",
              backgroundImage: `url(${marvelPic} )`,
              backgroundSize: "contain",
              backgroundPosition: "top",
              borderRadius: "inherit",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="Card-Top"></div>

            <div className="Card__gradient-overlay">
              <div className="Card-Bot">
                <h1
                  onClick={() => {
                    history.push("/character_:pageNumber", {
                      id: id,
                      name: name,
                      description: description,
                      thumbnail: thumbnail,
                    });
                  }}
                >
                  {name}
                </h1>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroCard;
