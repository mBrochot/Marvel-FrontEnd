import React from "react";

const Pagination = ({ limit, totalPosts, paginate, pageNumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="pagination-ul">
        {pageNumber > 1 ? (
          <li onClick={() => paginate(pageNumber - 1)}>-</li>
        ) : null}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={pageNumber === number ? "red" : "light-blue"}
          >
            <span onClick={() => paginate(number)}>{number}</span>
          </li>
        ))}
        {pageNumber < pageNumbers.length ? (
          <li onClick={() => paginate(pageNumber + 1)}>+</li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Pagination;
