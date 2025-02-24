import axios from 'axios'
import {createContext,useEffect,useState} from 'react'
import { getProducts } from '../mockproducts'

const ProductContext= createContext()

const ProductProvider = ({children}) => {
  const [products,setProducts]=useState([])

  


  const getData = async () =>{
    const data= await getProducts()
     // const response = await axios.get("http://localhost:3001/api/productos");
        // setProducts(response.data);
        // console.log(response.data)
        // let newData=data.map(item =>({...item, total_quantity:0}))
      setProducts(data)
  }

  useEffect (()=>{
    getData()
  },[])

  return <ProductContext.Provider value={{products,setProducts}}>
    {children}
  </ProductContext.Provider>
}

export {ProductProvider, ProductContext} 