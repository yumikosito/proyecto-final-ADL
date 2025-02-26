import { useState, useEffect, useContext } from "react";
import axios from "axios";
//import { getProducts } from "../../mockproducts";
import { UserContext } from "../../context/UserContext";
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const {user} = useContext(UserContext)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await getProducts()
        const response = await axios.get("http://localhost:3000/api/productos/mis-productos", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProducts(response.data);
        // console.log(response.data)
        // setProducts(response)
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [user.token]);

  return {products, setProducts} ;
};

export default useFetchProducts;

