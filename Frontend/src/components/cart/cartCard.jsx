import React, { useContext } from 'react'
import { Button, Card, Col, Container, Row, Form } from 'react-bootstrap'
import Minus from '../modifiers/MinusMod';
import PlusMod from '../modifiers/PlusMod'
import { Trash3 } from 'react-bootstrap-icons';
import moogle from '../../assets/img/moogle.png'
import { CartContext } from '../../context/CartContext';


const CartCard = (product) => {
  const {eraseProdCart} = useContext(CartContext)
  const precioFormat= product.product_price
  const count=product.total_quantity

  const plusTotal=precioFormat*count
  const totalFormat= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(plusTotal)

  function handleSubmit(e) {
    e.preventDefault();
  }

  const eraseProduct = (id) =>{
    eraseProdCart(id)
  }

  return (
    <>
    {count>0?
    <div id="cartCard" className='mb-3 mx-2 rounded-3'>
    
      <Container>
        <Row >
          <Col xs={12} sm={6} >
            <Row className="my-1 mx-0 py-2 d-flex justify-content-between align-items-center">
              <Col xs="auto" >
                <img src={product.product_photo} className='imgCart'/>
              </Col>

              <Col xs={7} className='mx-2 d-flex flex-column align-items-start justify-content-center'>
                <h6 className='cartProductTitle'>{product.product_name}</h6>
                <p className='cartProductShop'>Vendido por: {product.seller}</p>
              </Col>
              </Row>
            </Col>
    

          <Col xs={12} sm={6} className='m-0 p-0  d-flex justify-content-evenly align-items-center'>
            <Row className="">
              <Col  className="m-0 py-1" > <Minus product={product}/> </Col>

              <Col  className="m-0  py-1 px-0" >
                <Form.Control className='inputCart px-1' min={0} type="text" value={product.total_quantity} placeholder="0" onChange={handleSubmit}></Form.Control>
              </Col>

              <Col className="m-0 py-1" ><PlusMod product={product}/></Col>
              
              <Col className='px-0 py-1 cartProductPrice pr-3'>{totalFormat}</Col>

              <Col className='mx-3 py-1'>
                <Button onClick={()=>eraseProduct(product.id_product)} className='buttonErase' variant="danger"><Trash3/></Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container> 
    </div>
    :null}
    </>
  )
}

export default CartCard