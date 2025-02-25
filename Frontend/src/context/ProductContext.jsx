import axios from 'axios'
import {createContext,useContext,useEffect,useState} from 'react'
import { getProducts } from '../mockproducts'
import { UserContext } from './UserContext'

const ProductContext= createContext()

const ProductProvider = ({children}) => {
  const [products,setProducts]=useState([])
  const { user } = useContext(UserContext)

  


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

     Swal.fire({
        title: "Producto agregado con exito",
        icon: "success",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
  } catch (error) {
    console.error("Error al agregar producto nuevo:", error);
  }
  }

  return <ProductContext.Provider value={{products,setProducts, newProduct}}>
    {children}
  </ProductContext.Provider>
}

export {ProductProvider, ProductContext} 