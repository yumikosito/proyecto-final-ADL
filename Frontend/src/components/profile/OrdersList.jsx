import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrdersList = ({ order }) => {

  const navigate = useNavigate();
  const orderDetails = (idOrder) => {
    navigate(`/perfil/pedidos-anteriores/${idOrder}`);
  }

  const totalCLP= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(order.total)

  return (
    <div id="orderList" className="">
      <Container>
        <Row className="border border-danger-subtle my-3 py-1 px-2 border-2 rounded-3">
          <Col sm={12} md={4} className="p-2">
            <div>
              <div className="p-2 d-flex gap-3">
                <h3 className="title-acme ">Id de compra:</h3>
                <h3 className="title-acme">{order.id_compra}</h3>
              </div>
              <div className="p-2 d-flex gap-3">
                <h5 className="totalPriceOrder title-acme">Total: {totalCLP}</h5>
              </div>
            </div>
          </Col>
          <Col sm={12} md={5} className="p-2">
          <h3 className="title-acme p-2">Productos:</h3>
            {order.productos_comprados.map((producto, index) => (
              <p key={index} className="ps-2">{producto.nombre} x {producto.cantidad}</p>
            ))}
          </Col>
          <Col sm={12} md={3} className="my-auto d-flex flex-column gap-2">
            <Button variant="info" className="seeMore" onClick={() => orderDetails(order.id_compra)} >
              Ver más
            </Button>
            <Button className="orderListButton mb-2" variant="warning">
              Pedir nuevamente
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrdersList;
