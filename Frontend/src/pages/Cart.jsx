import React, { useContext, useEffect } from 'react'
import CartCard from '../components/cart/cartCard.jsx'
import CartOrder from '../components/cart/CartOrder'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { CartContext } from '../context/CartContext'
import Cartaddress from '../components/cart/CartAdress'

const Cart = () => {
  const {cart, eraseTotalCart}=useContext(CartContext)
  // const cartTrue= cart.filter(item=>(item.add===true))
  
  const eraseCart = () => {
    eraseTotalCart()
  }

  useEffect(()=>{

  },[cart])

  return (
    <div>
       <h1 id='titleText'>Mi carrito</h1>
       <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={8} className='p-0'>
          {cart.map((item)=>(
           <CartCard key={item.id_product} 
           product_name={item.product_name} product_price={item.product_price} product_photo={item.product_photo}  id_product={item.id_product} quantity={item.product_quantity} seller={item.seller} total_quantity={item.total_quantity}
           />))}
          
           <Button variant='danger' className='buttonErase ms-2 my-3' onClick={eraseCart}>Vaciar el carrito</Button>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
          <Cartaddress/>
          <CartOrder/>
          </Col>
        </Row>

       </Container>
      
    </div>
  )
}

export default Cart