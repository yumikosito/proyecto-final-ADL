import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({ totalProducts, limits, setPage }) => {
  const [active, setActive] = useState(1);
  const totalPages = Math.ceil(totalProducts / limits); 

  const handlePageChange = (number) => {
    setActive(number);
    setPage(number); 
  };

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