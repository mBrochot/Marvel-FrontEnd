import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const ComicCard = ({ id, title, description, thumbnail, fav }) => {
  const [favorite, setFavorite] = useState(fav);
  // const history = useHistory();
  const marvelPic = `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;

  const handleClick = (id) => {
    let comicIds = Cookies.get("comicIds");
    if (!comicIds) {
      const comicId = `-${id}`;
      Cookies.set("comicIds", comicId, {
        expires: 7,
      });
    } else {
      const comicIdsArray = comicIds.split("-");
      const idOfComic = comicIdsArray.indexOf(id.toString());
      if (idOfComic === -1) {
        Cookies.set("comicIds", `${comicIds}-${id}`, {
          expires: 7,
        });
      }
      if (idOfComic !== -1) {
        comicIdsArray.splice(idOfComic, 1);
        const stringOfComicId = comicIdsArray.join("-");
        Cookies.set("comicIds", stringOfComicId, {
          expires: 7,
        });
      }
    }
  };

  return (
    <>
      {thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
        <>
          <div className="container" key={id}>
            <FontAwesomeIcon
              className={favorite ? "plus-icon-card-r" : "plus-icon-card-w"}
              icon="plus"
              size="3x"
              onClick={() => {
                handleClick(id);
                setFavorite(!favorite);
              }}
            />
            <img className="image" src={marvelPic} alt="comic-pic" />
            <div className="overlay">
              <div className="text">
                <h1>{title}</h1>
                {description}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ComicCard;
