import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'
import axios from 'axios'
import { UserContext } from '../../context/UserContext'

const PlusMod = ({product}) => {
  console.log("1 ", product);
  
  const {cart,setCart,getCart} = useContext(CartContext)
  const { user } = useContext(UserContext)
  console.log(cart);
  

  const Modquantity = async(id) =>{
    let count = product.total_quantity+1
    console.log(count);
    
    const res = await axios.post("http://localhost:3000/api/carrito/editar", {id_product: id, total_quantity: count},{
      headers:{
        Authorization:`Bearer ${user.token}`,
    },
  });
  getCart()
    
  // if((product.total_quantity)<product.quantity){
  //   const newAdd=cart.map(item =>{
  //     if(item.id_product===id){
  //       return {...item, total_quantity:product.total_quantity+1}
  //     } 
  //     return item
  //   })
  //    setCart(newAdd)
  // }
}
  


  return (
    <div>
      <Button className='p-1' variant='light'
      onClick={() => Modquantity(product.id_product)}
      ><Plus size={15}/>
      </Button>
    </div>
  )
}

export default PlusMod
