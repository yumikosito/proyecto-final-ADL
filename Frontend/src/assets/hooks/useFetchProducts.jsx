import { useState, useEffect } from "react";
import axios from "axios";
import { getProducts } from "../../mockproducts";
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts()

        // const response = await axios.get("http://localhost:3001/api/productos");
        // setProducts(response.data);
        // console.log(response.data)
        setProducts(response)
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return products ;
};


 // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/productos");
  //       setProducts(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   };
  //   fetchProducts();
  // }, []);

  // return {products}

export default useFetchProducts;

