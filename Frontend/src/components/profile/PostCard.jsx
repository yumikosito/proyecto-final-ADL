import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostCard = ({ product_name, product_description, product_photo, id_product, product_price, product_quantity, handleDelete }) => {
  const navigate = useNavigate();
  const edit = (idProduct) => {
    navigate(`/perfil/mis-productos/editar/${idProduct}`);
  };

  const totalFormat= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product_price)


  return (
    <Container>
      <Row className="cardMyProducts rounded-3 my-3 py-2 px-2 border-2">
        <Col sm={12} md={3} className=" d-flex justify-content-center align-items-center pt-2">
          <img src={product_photo} alt="" className="imgMyProducts rounded-3" />
        </Col>
        <Col sm={12} md={6} className="p-2">
          <div>
            <div className="p-2">
              <h4 className="title-acme">{product_name}</h4>
            </div>
            <div div className="p-1">
              {product_description}
            </div>
            <div div className="p-1 priceTextPostCard">
              Precio: {totalFormat}
            </div>
            <div div className="p-1 ">
              Cantidad: {product_quantity}
            </div>
          </div>
        </Col>
        <Col sm={12} md={2} className="my-auto">
          <Button div className="m-2 editProductsButton" variant="warning" onClick={() => edit(id_product)}>Editar</Button>
          <Button div className="m-2 buttonErase" variant="danger" onClick={() => handleDelete(id_product)}>Eliminar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PostCard;
