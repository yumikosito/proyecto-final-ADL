import React, { useContext, useEffect, useState } from "react";
import ProductContainer from "../components/home/ProductContainer";
import useFetchProducts from "../assets/hooks/useFetchProducts";
import { Col, Container, Row } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";

const Home = () => {
  const {products, totalProducts, limits, setPage} = useContext(ProductContext)

  return (
    <>
    <Container fluid className="mt-4">
      <Row>
          <ProductContainer products= {products} totalProducts={totalProducts} limits={limits} setPage={setPage} />
      </Row>
    </Container>

    </>
  );
};

export default Home;
