import React, { useState, useEffect, useContext } from "react";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const PostContainer = ({products}) => {

  const { user } = useContext(UserContext);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/api/mis-productos", {
  //         headers: { Authorization: `Bearer ${user.token}` }
  //       });
  //       setProducts(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.log(error)
  //     }

  //   };
  //   fetchProducts();
  // }, [user.token]);

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
      
            {products.map(
              (
                prod 
              ) => <PostCard key={prod.id_product} {...prod} />
            )}
         
        </Col>
      </Row>
    </Container>
  );
};

export default PostContainer;
