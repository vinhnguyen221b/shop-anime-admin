import React from "react";
import _ from "lodash";
function Pagination({ amount, pageSize, pageIndex, onPageChange }) {
  const numberPages = Math.ceil(amount / pageSize);
  if (numberPages === 1) return null;
  const pages = _.range(1, numberPages + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === pageIndex ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
