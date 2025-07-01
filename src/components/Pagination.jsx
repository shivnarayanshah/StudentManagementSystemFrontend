import { Button } from "@material-tailwind/react";
import React from "react";

const Pagination = ({ currentPage, totalPages, setSearchParams }) => {
  const getPageNumbers = (currentPage, totalPages) => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };
  const pages = getPageNumbers(currentPage, totalPages);
  return (
    <div className="flex gap-4">
      {pages.map((p, index) => (
        <div key={index}>
          {p === "..." ? (
            <span className="px-2">...</span>
          ) : (
            <Button
              size="sm"
              onClick={() => setSearchParams({ page: p })}
              className={
                p === currentPage ? "bg-green-900   text-white " : "bg-gray-800"
              }
            >
              {p}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
