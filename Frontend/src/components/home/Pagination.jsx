import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({ totalProducts, limits, setPage, handlePageChange, active, setActive }) => {
  const totalPages = Math.ceil(totalProducts / limits); 

  return (
    <Pagination>
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === active}
          onClick={() => {
            handlePageChange(index + 1)
            
          }
          }
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;