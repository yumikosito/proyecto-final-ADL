import axios from 'axios'
import {createContext,useContext,useEffect,useState} from 'react'
import { UserContext } from './UserContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
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

  const newProduct = async(product_name, product_price, product_quantity, product_photo, product_description, product_category) => {
    const newProduct={
      product_name:product_name.value,
      product_price:parseInt(product_price.value),
      product_quantity:product_quantity.value,
      product_photo:product_photo.value,
      product_description:product_description.value,
      product_category:product_category.value,
    }
    
    try {
    const res= await axios.post("http://localhost:3000/api/productos/mis-productos/agregar", newProduct,{
      headers:{
              Authorization:`Bearer ${user.token}`,
          },})
      if (res.data.msg=="Producto registrado satisfactoriamente"){
        navigate('/')
          Swal.fire({
              title: "Producto agregado con exito",
              icon: "success",
              confirmButtonColor: "#68D5E8",
              color:"#323232"
            })
              
        }
  } catch (error) {
    console.error("Error al agregar producto nuevo:", error);
  }
  }

  return <ProductContext.Provider value={{products,setProducts, newProduct, filteredProducts,totalProducts,limits,setPage,setFilters}}>
    {children}
  </ProductContext.Provider>
}

export { ProductProvider, ProductContext };