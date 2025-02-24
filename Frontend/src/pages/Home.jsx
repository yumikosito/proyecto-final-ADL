import React, { useContext, useEffect, useState } from "react";
import ProductContainer from "../components/home/ProductContainer";
import useFetchProducts from "../assets/hooks/useFetchProducts";
import { Col, Container, Row } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";

const Home = () => {
  const {products} = useContext(ProductContext)

  return (
    <>
    <Container fluid className="mt-4">
      <Row>
          <ProductContainer products= {products} />
      </Row>
    </Container>

    </>
  );
};

export default Home;

