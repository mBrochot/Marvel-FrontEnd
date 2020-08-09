import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const HeroCard = ({ id, name, description, thumbnail, comics }) => {
  const history = useHistory();
  const marvelPic = `${thumbnail.path}/standard_fantastic.${thumbnail.extension}`;

  const [fav, setFav] = useState(false);

  return (
    <>
      {thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
        <div className="hero-card">
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
          <FontAwesomeIcon
            classname="plus-icon-card"
            icon="plus"
            size="3x"
            color="white"
            onClick={() => {
              setFav(!fav);
              if (Cookies.get(`${id}`)) {
                Cookies.remove(`${id}`);
              } else {
                Cookies.set(`${id}`, `${marvelPic}`, { expires: 7 });
              }
            }}
          />
        </div>
      )}
    </>
  );
};

export default HeroCard;
