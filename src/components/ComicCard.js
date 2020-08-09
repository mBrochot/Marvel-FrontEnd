import React from "react";
import { useHistory } from "react-router-dom";

const ComicCard = ({ id, title, description, thumbnail, comics }) => {
  const history = useHistory();
  const marvelPic = `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;

  return (
    <>
      {thumbnail.path !==
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (
        <>
          <div className="container" key={id}>
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
