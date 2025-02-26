import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limits, setLimits] = useState(6);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    precio_min: "",
    precio_max: "",
    categoria: "",
  });

  // Obtener productos desde el backend
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/productos?limits=${limits}&page=${page}`
      );
      setProducts(response.data.results);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Obtener productos filtrados desde el backend
  const getFilteredProducts = async () => {
    try {
      const { precio_min, precio_max, categoria } = filters;
      const response = await axios.get(
        `http://localhost:3000/api/productos/filtros?precio_min=${precio_min}&precio_max=${precio_max}&categoria=${categoria}`
      );
      setFilteredProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error al obtener productos filtrados:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  useEffect(() => {
    if (filters.precio_min || filters.precio_max || filters.categoria) {
      getFilteredProducts();
    } else {
      setFilteredProducts(products);
    }
  }, [filters, products, page]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        totalProducts,
        limits,
        setPage,
        setFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };