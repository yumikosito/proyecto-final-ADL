import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Dash } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'

const MinusMod = ({product}) => {
  const {cart,setCart,getCart} = useContext(CartContext)
  const { user } = useContext(UserContext)

    
    const Modquantity = async(id) =>{
      let count = product.total_quantity-1
      console.log(count);
      
      const res = await axios.post("http://localhost:3000/api/carrito/editar", {id_product: id, total_quantity: count},{
        headers:{
          Authorization:`Bearer ${user.token}`,
      },
    });
    getCart()
  }
  

 
  
  return (
    <div>
      <Button className='p-1' variant='light'
      onClick={() => Modquantity(product.id_product)}
      ><Dash size={15}/>
      </Button>
    </div>
  )
}

export default MinusMod