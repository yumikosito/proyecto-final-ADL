import React, { useContext, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { CheckLg } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'
import useInput from '../../assets/hooks/useInput'
import Swal from 'sweetalert2'

const cartOrders = () => {
  
  const {cart,totalCart,totalCLP,totalDelivery,totalDiscount,totalOrder,setDiscount}=useContext(CartContext)
  const cuponDiscount = useInput("")

  const cuponApply = (e) =>{
    e.preventDefault()
    
    if (cuponDiscount.value=='VIVI1000'){
      setDiscount(1000)
    } else if (cuponDiscount.value=='GARNET5000'){
      setDiscount(5000)
    } else{
      Swal.fire({
        title: "Cupon no existe",
        icon: "error",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
    }
  }


  // const handleSubmit= async(e) =>{
  //   e.preventDefault()
  //   try {
  //       const response= await axios.post("http://localhost:3001/carrito/comprar", {cartTrue})

  //       alert("Carrito enviado con exito")
  //   } catch (error) {
  //   }
  // }

  

  return (
    <div id='cartFinalOrder' className='p-3 mb-3 mx-2 rounded-3' >
      <Container>
          <p className='cartOrderTitle pt-2 mb-2'>Resumen de compra</p>
        <Row className='d-flex flex-column mb-3'>
         <p className='mb-1 cartOrderSub'>¿Tienes un cupon de descuento?</p>
         <Form onSubmit={cuponApply}>
          <Col className='d-flex'>
            <Form.Control onInput={(e) => e.target.value = ("" + e.target.value).toUpperCase()} size="sm" className='me-3 cuponInput' placeholder="Ingresa el codigo"{...cuponDiscount}></Form.Control>
            <Button className='button' type='submit'><CheckLg/></Button>
          </Col>
         </Form>
          
          <Col className='mt-3 d-flex flex-row justify-content-between cartOrderSub'>
            <p className='mb-0 p-0'>Numero de productos:</p><span>{totalCart}</span>
          </Col>
          <Col className=''>
            <hr className=' m-0 p-0 hr'/>
          </Col>

          <Col className='mt-2 d-flex justify-content-between cartOrderSub'>
            <p className='mb-0'>Subtotal:</p><span>{totalCLP} CLP</span>
          </Col>
          <Col className='mt-0 d-flex justify-content-between cartOrderSub'>
            <p className='mb-0'>Descuentos</p><span>{totalDiscount} CLP</span>
          </Col>
          <Col className='mt-0 d-flex justify-content-between cartOrderSub'>
            <p className='mb-0'>Despacho:</p><span>{totalDelivery} CLP</span>
          </Col>
          <Col className=''>
            <hr className=' m-0 p-0 hr'/>
          </Col>

          <Col className='mt-3 d-flex justify-content-between cartOrderTotal'>
            <p className=''>Total:</p><span>{totalOrder} CLP</span>
          </Col>
        
          <Button type='submit' variant='info' className='buttonCheckout'>Comprar</Button>
        </Row>
      </Container>
    </div>
  )
}

export default cartOrders
