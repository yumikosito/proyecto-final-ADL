import axios from 'axios'
import {createContext,useContext,useState} from 'react'
import { UserContext } from './UserContext'
import Swal from 'sweetalert2'

const CartContext= createContext()

const CartProvider = ({children}) => {
  const [cart,setCart]=useState([])
  const [total, setTotal] = useState(0)
  const [discount,setDiscount] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const { user } = useContext(UserContext)
  

  const getCart = async () =>{
    try {
      const res= await axios.get("http://localhost:3000/api/carrito/",{
        headers:{
          Authorization:`Bearer ${user.token}`,
      }})     
      setCart (res.data.cart);
      setTotal (res.data.total_price)
      setTotalProducts(res.data.total_products)
    } catch (error) {
      console.log(error); 
    }
  }

  const quantityMinus = async(id,product) =>{
    let count = product.total_quantity-1
    
    const res = await axios.post("http://localhost:3000/api/carrito/editar", {id_product: id, total_quantity: count},{
      headers:{
        Authorization:`Bearer ${user.token}`,
      },
    });
    getCart()
  }

  const quantityPlus = async(id,product) =>{
    let count = product.total_quantity+1
    
    const res = await axios.post("http://localhost:3000/api/carrito/editar", {id_product: id, total_quantity: count},{
      headers:{
        Authorization:`Bearer ${user.token}`,
      },
    });
    getCart()
  }
  


  const eraseProduct = async (id) =>{
    const res = await axios.post("http://localhost:3000/api/carrito/editar",{id_product: id, total_quantity: 0},{
      headers:{
        Authorization:`Bearer ${user.token}`,
    },
  });
    if(cart.length==1){
      setDiscount(0)
    }
    getCart()
  }

  const addCart = async (idProduct)=>{ 
    if (!cart.some(product => product.product_id == idProduct)){
        const res = await axios.post("http://localhost:3000/api/carrito/editar",{id_product: idProduct, total_quantity: 1},{
          headers:{
            Authorization:`Bearer ${user.token}`,
        },})
        
        if (res.data.msg=="Producto agregado con exito"){
          getCart()
        
         } else if(res.data.msg==="No puedes agregar al carrito un producto tuyo"){
            Swal.fire({
              title: "No puedes agregar al carrito un producto tuyo",
              icon: "error",
              confirmButtonColor: "#68D5E8",
              color:"#323232"
            })
         }
  
      
    } else{
      const product = cart.find(item => item.product_id == idProduct);   
      const res = await axios.post("http://localhost:3000/api/carrito/editar",{id_product: idProduct, total_quantity: product.total_quantity+1},{
        headers:{
          Authorization:`Bearer ${user.token}`,
      },})
          if (res.data.msg=="Producto editado con exito"){
          getCart()
        
         } else if(res.data.msg=="Sobrepasaste el stock disponible del producto"){
            Swal.fire({
              title: "Sobrepasaste el stock disponible del producto",
              icon: "error",
              confirmButtonColor: "#68D5E8",
              color:"#323232"
            })
         }
    }
  }

  const buyCart= async() =>{
    try {
      console.log(user.token);
      
      const res = await axios.post("http://localhost:3000/api/carrito/comprar",{
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      });

        
      if (res.data.msg=="Carrito fue comprado con éxito"){
      getCart()
        Swal.fire({
          title: "Carrito fue comprado con éxito",
          icon: "success",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        })

      } else if (res.data.msg=="No se pudo enviar la orden") {
        Swal.fire({
          title: "No se pudo enviar la orden",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        })

      } else if(res.data.msg=="Carrito esta vacio"){
        Swal.fire({
          title: "Carrito esta vacio",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        })
      } 
         
    } catch (error) {
      console.log(error);
    }
  }

  const eraseTotalCart = async() => {
    const res = await axios.delete("http://localhost:3000/api/carrito/eliminar",{
      headers:{
        Authorization:`Bearer ${user.token}`,
    },
  });
    setDiscount(0)
    getCart()
  }
 
  let delivery = 0
  if(cart.length>0){
    delivery = 3000
  } 
  const Order=total+delivery-discount

  const totalCLP= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(total)
  const totalDelivery = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(delivery)
  const totalDiscount = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(discount)
  const totalOrder= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(Order)


  

  return <CartContext.Provider value={{cart, setCart, totalProducts, totalCLP, totalDelivery, totalDiscount, totalOrder, setDiscount, getCart, quantityMinus, quantityPlus, eraseProduct, buyCart, addCart, eraseTotalCart}}>
    {children}
  </CartContext.Provider>
}

export {CartProvider, CartContext} 