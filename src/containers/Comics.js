import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import Pagination from "../components/Pagination";
import ComicCard from "../components/ComicCard";
import loading from "../images/loading.svg";

const Comics = () => {
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
    history.push("/comics_" + pageNumber);
  };

  for (let i = 1; i <= Math.ceil(data.total / limit); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-back-end.herokuapp.com/comics?offset=${skipping}`
      );
      setData(response.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, [skipping]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://marvel-back-end.herokuapp.com/comics/search?titleStartsWith=${research}`
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
            placeholder="what comics are you looking for ?"
            value={research}
            onChange={(event) => {
              setResearch(event.target.value);
            }}
          />
          <button className="search-btn" type="submit">
            search
          </button>
        </form>
      </div>
      <div className="comics-wrap">
        <>
          {isLoading ? (
            <div className="loading">
              <img src={loading} alt="loading" />
            </div>
          ) : (
            data.results.map((comic, index) => {
              return <ComicCard {...comic} key={comic.id} />;
            })
          )}
        </>
      </div>
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

export default Comics;
