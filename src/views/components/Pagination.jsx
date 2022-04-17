import React from "react";
import {range} from "lodash";
import useGenerator from "../../global/Idgenerator";
const Pagination = ({ total ,perPage , onPageChange, currentPage}) => {
    const [generateID] = useGenerator();
    const pageCount = Math.ceil(total / perPage);
    if (pageCount === 1) return null;
    const pages = range(1, pageCount + 1);
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {pages.map(page => (
                    <li
                        key={generateID()}
                        className={
                            page === currentPage
                                ? "page-item active"
                                : "page-item"
                        }
                    >
                        <a
                            className="page-link"
                            style={{ cursor: "pointer" }}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
