import React, { useState, useEffect, useContext } from "react";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";

const PostContainer = ({ products, handleDelete }) => {

  return (
    <Container>
      <Row className="m-3 d-flex justify-content-center">
        <Col>
          <h2 id="titleProfile" className="my-2">
            Mis productos
          </h2>
        </Col>
      </Row>
      <Row className="m-3 d-flex justify-content-center">
        <Col>
          {products
            ? products.map((prod) => (
                <PostCard key={prod.id_product} {...prod} handleDelete={handleDelete} />
              ))
            : "No hay productos que mostrar"}
        </Col>
      </Row>
    </Container>
  );
};

export default PostContainer;
