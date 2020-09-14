import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import Pagination from "../components/Pagination";
import CharacterHeader from "../components/CharacterHeader";
import loading from "../images/loading.svg";

const Character = () => {
  const location = useLocation();
  const { id, name, description, thumbnail } = location.state;
  const characterPic = `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pageNumber } = useParams();
  const pageNumbers = [];

  const history = useHistory();

  const [limit, setLimit] = useState(100);
  let skipping = 0;
  if (pageNumber > 1) skipping = (pageNumber - 1) * 100;

  const paginate = (pageNumber) => {
    history.push("/character_" + pageNumber, {
      id: id,
      name: name,
      description: description,
      thumbnail: thumbnail,
    });
  };

  for (let i = 1; i <= Math.ceil(data.total / limit); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-back-end.herokuapp.com/character/comics?id=${id}&offset=${skipping}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skipping, id]);

  return isLoading ? (
    <div className="loading">
      <img src={loading} alt="loading" />
    </div>
  ) : (
    <>
      <CharacterHeader
        characterPic={characterPic}
        name={name}
        description={description}
      />

      <ul className="character-comics-wrap">
        {data.results.map((comic, index) => {
          const marvelPic = `${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`;
          return (
            <li className="character-comics-card">
              <img src={marvelPic} alt={comic.title} />
              <div className="character-comics-text">
                <h2 className="character-comics-title">{comic.title}</h2>

                <p>{comic.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination
        totalPosts={data.total}
        pageNumber={pageNumber}
        limit={limit}
        paginate={paginate}
        setLimit={setLimit}
      />
    </>
  );
};

export default Character;
