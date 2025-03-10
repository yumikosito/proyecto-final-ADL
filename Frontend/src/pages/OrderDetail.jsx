import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { getOrders } from "../mockOrders";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrderProducts, setTotalOrderProducts] = useState(0);
  const { getCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const getTotalProducts = () => {
    let total = 0;
    order.forEach((product) => {
      total += product.product_order_quantity;
    });
    setTotalProducts(total);
  };

  const totalDelivery = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(3000)

  const getTotalOrderProducts = () => {
    let total = 0;
    order.forEach((product) => {
      total += product.product_order_quantity * product.product_price;
    });
    setTotalOrderProducts(total);
  };

  const reorder = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/pedidos/repetir-pedido/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  const subTotal = totalOrderProducts ;
  const subTotalFormat = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(subTotal);
  const totalOrderProductFormat = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  }).format(totalOrderProducts+3000);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderDetail = await axios.get(
        `http://localhost:3000/api/pedidos/mis-pedidos/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setOrder(orderDetail.data);
    };

    fetchOrders();
  }, [id]);

  useEffect(() => {
    getTotalOrderProducts();
    getTotalProducts();
  });

  
  

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="title-acme m-3 py-4">Detalle pedido anterior</h2>
          <h3 className="title-acme m-3">Id de compra: {id} </h3>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col xs={12} md={8}>
          {order.length > 0
            ? order.map((product, index) => (
                <Row id="cartCard" key={index} className="p-2 rounded-3 mb-2">
                  <Col xs={12} sm={6}>
                    <Row className="my-1 mx-0 py-2 d-flex justify-content-between align-items-center">
                      <Col xs="auto">
                        <img src={product.product_photo} className="imgCart" />
                      </Col>

                      <Col
                        xs={7}
                        className="mx-2 d-flex flex-column align-items-start justify-content-center"
                      >
                        <h6 className="cartProductTitle">
                          {product.product_name}
                        </h6>
                        <p className="cartProductShop">
                          Vendido por: {`${product.name} ${product.lastname}`}
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
                          Cantidad: {product.product_order_quantity}
                        </h5>
                      </Col>

                      <Col className="px-0 py-1 cartProductPrice pr-3">
                        Precio: {new Intl.NumberFormat("es-CL", {currency: "CLP",style: "currency",}).format(product.product_price)}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))
            : "No hay productos"}
        </Col>

        <Col xs={12} md={4} className="">
          <div id="cartFinalOrder" className="p-3 mb-3 mx-2 rounded-3">
            <Container>
              <p className="cartOrderTitle pt-2 mb-2">Resumen de compra</p>
              <Row className="d-flex flex-column mb-3">
                {/* <p className="mb-1 cartOrderSub">Cupón de descuento aplicado</p>
                <Form>
                  <Col className="d-flex">
                    <Form.Control
                      onInput={(e) =>
                        (e.target.value = ("" + e.target.value).toUpperCase())
                      }
                      size="sm"
                      className="me-3 cuponInput"
                      value="VIVI100"
                    ></Form.Control>
                    <Button className="button" type="submit">
                      <CheckLg />
                    </Button>
                  </Col>
                </Form> */}

                <Col className="mt-3 d-flex flex-row justify-content-between cartOrderSub">
                  <p className="mb-0 p-0">Numero de productos:</p>
                  <span>{totalProducts}</span>
                </Col>
                <Col className="">
                  <hr className=" m-0 p-0 hr" />
                </Col>

                <Col className="mt-2 d-flex justify-content-between cartOrderSub">
                  <p className="mb-0">Subtotal:</p>
                  <span>{subTotalFormat} CLP</span>
                </Col>
                {/* <Col className="mt-0 d-flex justify-content-between cartOrderSub">
                  <p className="mb-0">Descuentos</p>
                  <span>{totalDiscount} CLP</span>
                </Col> */}
                <Col className="mt-0 d-flex justify-content-between cartOrderSub">
                  <p className="mb-0">Despacho:</p>
                  <span>{totalDelivery} CLP</span>
                </Col>
                <Col className="">
                  <hr className=" m-0 p-0 hr" />
                </Col>

                <Col className="mt-3 d-flex justify-content-between cartOrderTotal">
                  <p className="">Total:</p>
                  <span>{totalOrderProductFormat} CLP</span>
                </Col>

                <Button
                  variant="info"
                  className="buttonCheckout"
                  onClick={reorder}
                >
                  Pedir nuevamente
                </Button>
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
