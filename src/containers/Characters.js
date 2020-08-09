import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Pagination from "../components/Pagination";
import HeroCard from "../components/HeroCard";
import loading from "../images/loading.svg";

const Characters = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { pageNumber } = useParams();
  const pageNumbers = [];

  const [research, setResearch] = useState("");

  const history = useHistory();

  const [limit, setLimit] = useState(100);
  let skipping = 0;
  if (pageNumber > 1) skipping = (pageNumber - 1) * 100;

  const paginate = (pageNumber) => {
    history.push("/characters_" + pageNumber);
  };

  for (let i = 1; i <= Math.ceil(data.total / limit); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-back-end.herokuapp.com/characters?offset=${skipping}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skipping]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://marvel-back-end.herokuapp.com/characters/search?nameStartsWith=${research}`
    );
    setData(response.data.data);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="what character are you looking for ?"
            value={research}
            onChange={(event) => {
              setResearch(event.target.value);
            }}
          />
          <button className="search-btn" type="submit">
            SEARCH
          </button>
        </form>
      </div>
      <div className="card-wrap">
        <>
          {isLoading ? (
            <div className="loading">
              <img src={loading} alt="loading" />
            </div>
          ) : (
            data.results.map((character, index) => {
              return <HeroCard {...character} key={character.id} />;
            })
          )}
        </>
      </div>

      <Pagination
        totalPosts={data.total}
        pageNumber={pageNumber}
        limit={limit}
        paginate={paginate}
      />
    </>
  );
};

export default Characters;
