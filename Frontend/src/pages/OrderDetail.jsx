import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getOrders } from "../mockOrders";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import { CartContext } from "../context/CartContext";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const {cart,totalCart,totalCLP,totalDelivery,totalDiscount,totalOrder,setDiscount}=useContext(CartContext)


  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      const orderFound = data.find((o) => o.id_compra === Number(id));
      setOrder(orderFound);
      console.log(orderFound);
    };
    fetchOrders();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="title-acme m-3 py-4">Detalle pedido anterior</h2>
          <h3 className="title-acme m-3">Id de compra: {order.id_compra} </h3>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={7}>
          {order.productos_comprados
            ? order.productos_comprados.map((producto, index) => (
                <Row id="cartCard" key={index} className="p-2 rounded-3 mb-2">
                  <Col xs={12} sm={6}>
                    <Row className="my-1 mx-0 py-2 d-flex justify-content-between align-items-center">
                      <Col xs="auto">
                        <img src={producto.foto} className="imgCart" />
                      </Col>

                      <Col
                        xs={7}
                        className="mx-2 d-flex flex-column align-items-start justify-content-center"
                      >
                        <h6 className="cartProductTitle">{producto.nombre}</h6>
                        <p className="cartProductShop">
                          Vendido por: {producto.vendedor}
                        </p>
                      </Col>
                    </Row>
                  </Col>

                  <Col
                    xs={12}
                    sm={6}
                    className="m-0 p-0  d-flex justify-content-between align-items-center"
                  >
                    <Row className="d-flex justify-content-between">
                      <Col
                        xs={7}
                        className="mx-2 d-flex flex-column align-items-start justify-content-center"
                      >
                       
                        <h5 className="cartProductTitle">
                          Cantidad: {producto.cantidad}
                        </h5>
                      </Col>

                      <Col className="px-0 py-1 cartProductPrice pr-3">
                        Precio: ${producto.precio}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))
            : "No hay productos"}
        </Col>

        <Col md={4} className="ms-5">
          <div id='cartFinalOrder' className='p-3 mb-3 mx-2 rounded-3' >
                <Container>
                    <p className='cartOrderTitle pt-2 mb-2'>Resumen de compra</p>
                  <Row className='d-flex flex-column mb-3'>
                   <p className='mb-1 cartOrderSub'>Cupón de descuento aplicado</p>
                   <Form>
                    <Col className='d-flex'>
                      <Form.Control onInput={(e) => e.target.value = ("" + e.target.value).toUpperCase()} size="sm" className='me-3 cuponInput' value="VIVI100"></Form.Control>
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
          
                    <Button type='submit' variant='info' className='buttonCheckout'>Pedir nuevamente</Button>
                  </Row>
                </Container>
              </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
