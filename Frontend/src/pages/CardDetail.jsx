import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Button, Col, Row, Container } from "react-bootstrap";
import { UserContext } from "../context/UserContext.jsx";
import useFetchProducts from "../assets/hooks/useFetchProducts.jsx";
import MinusMod from "../components/modifiers/MinusMod.jsx";
import PlusMod from "../components/modifiers/PlusMod.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { CartContext } from "../context/CartContext.jsx";

const CardDetail = () => {
  const {userLog} = useContext(UserContext)
  const { addCart } = useContext(CartContext)
  const navigate = useNavigate()
  const { id } = useParams();
  const { filteredProducts} = useContext(ProductContext)
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      if(filteredProducts.length > 0) {

        const id_params = Number(id)
        const productFound = filteredProducts.find(prod => prod.id_product === id_params )
        setProduct(productFound);
      }
    };
    getProduct();
  }, [id, filteredProducts]);

  const buttonCart = (idProduct)=>{
    addCart(idProduct)
  }

  const goback = () =>{
    navigate('/')
  }

  const totalCLP= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product.product_price)

  return (
    <div id="cardDetail" className="mx-3">
      <Container>
        <h1 id='titleText' className="text-center my-4">Detalle del producto</h1>
        <Row className="justify-content-center my-5">
          <Col className="border border-2 border-danger-subtle rounded-3 p-4">
            <Row className="align-items-center my-4">
              <Col className="text-center pe-4 mb-5" md={6} sm={12}>
                <Image src={product.product_photo} className="w-75" />
              </Col>
              <Col>

                <h2 className="title-acme">{product.product_name}</h2>
                <h1 className="textPrice pb-2"> {totalCLP} CLP</h1>
                <h4 className="pb-2 textShop">Vendido por: {product.seller_name}</h4>
                <h6 className="pb-5">Descripción: {product.product_description}</h6>
                <div>
                  <h6>Cantidad disponible: {product.product_quantity}</h6>
                  <div className="d-flex align-items-baseline">
                  </div>
                </div>
                
                <Col className="">
                   <Button
                   disabled={userLog ? "": true}
                   onClick={()=>buttonCart(product.id_product)}
                   className="addCartButton mt-3 px-3 mx-2" variant="warning">
                      Agregar al carrito
                    </Button>
                  <Button onClick={goback} className="goDetails mt-3 px-3 mx-2" variant="info">
                    Atras
                  </Button>
                </Col>
        
                </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CardDetail;
