import axios from 'axios'
import {createContext,useContext,useEffect,useState} from 'react'
import { UserContext } from './UserContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [limits, setLimits] = useState(6);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([])
  const [resultProduct, setResultProduct] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [max, setMax] = useState(0)

  const [filters, setFilters] = useState({
    precio_min: "",
    precio_max: "",
    categoria: "",
    limits: 6,
    search: "",
    sort: "asc",
  });

  const getFilteredProducts = async () => {
    try {
      const { precio_min, precio_max, categoria, search, sort, limits } = filters;
      const response = await axios.get(
        `http://localhost:3000/api/productos/?limits=${limits}&page=${page}&sort=${sort}&search=${search}&precio_min=${precio_min}&precio_max=${precio_max}&categoria=${categoria}`
      );
      setFilteredProducts(response.data.results);
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Error al obtener productos filtrados:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/productos/max");     
      setMax(response.data);
    } catch (error) {
      console.error("Error al obtener todos los productos:", error);
    }
  }
  
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
      getFilteredProducts();
  }, [filters, page]);


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
            getFilteredProducts();
        }
  } catch (error) {
    console.error("Error al agregar producto nuevo:", error);
  }
  }

  return <ProductContext.Provider value={{newProduct, filteredProducts,totalProducts,limits,setPage,setFilters,result, setResult,resultProduct, setResultProduct,  page, allProducts}}>
    {children}
  </ProductContext.Provider>
}

export { ProductProvider, ProductContext };