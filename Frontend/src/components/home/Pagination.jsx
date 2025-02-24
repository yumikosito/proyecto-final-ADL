import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({filteredProducts}) => {
  const [active, setActive] = useState(1); 
 

  let items = [filteredProducts];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === active} 
        onClick={() => setActive(number)} 
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div >
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationComponent;