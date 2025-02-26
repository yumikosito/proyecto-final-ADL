import axios from 'axios'
import {createContext,useEffect,useState} from 'react'
import { getProducts } from '../mockproducts'

const ProductContext= createContext()

const ProductProvider = ({children}) => {
  const [products,setProducts]=useState([])
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limits = 6;
  
  const getData = async () =>{
    // const data= await getProducts()
    try {
      const response = await axios.get(`http://localhost:3000/api/productos?limits=${limits}&page=${page}`);
        const data = response.data.results;
        setTotalProducts(response.data.total)
        setProducts(data)
        console.log(response.data)
    } catch (error) {
      console.error("Error al obtener productos", error)
    }
  
      // setProducts(data)
  }

  useEffect (()=>{
    getData()
  },[page])

  return <ProductContext.Provider value={{products,setProducts, totalProducts, limits, setPage}}>
    {children}
  </ProductContext.Provider>
}

export {ProductProvider, ProductContext} 