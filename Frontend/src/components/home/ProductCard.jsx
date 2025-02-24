import React, { useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product_name, product_price, product_photo, id_product }) => {
  const priceCLP= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product_price)
  const {userLog} = useContext(UserContext)
  const { cart,addCart } = useContext(CartContext)

  const navigate = useNavigate();
  const details = (idProduct) => {
    navigate(`/producto/${idProduct}`);
  }

  const buttonCart = (idProduct)=>{
      addCart(idProduct)  
  }
  
  return (
    <div id="cardProduct">
    <Card style={{ width: "16rem",height:"27rem" }} className="m-5 p-3 border-2 border border-danger-subtle">
      <Card.Img variant="top" src= {product_photo} className="img img-fluid rounded-3" />
      <Card.Body>
        <Card.Title className="title-acme">{product_name}</Card.Title>
        <Card.Text className="priceText">{priceCLP}</Card.Text>
        <Button variant="info" className="mb-2 goDetails px-4" onClick={() => details(id_product)}>Ver detalles</Button>
        <Button
        // disabled={userLog.logged ? "":"false"} 
        variant="warning" className="addCartButton" onClick={()=>buttonCart(id_product)}>Agregar al carrito</Button>
      </Card.Body>
    </Card>     
    </div>
  );
};

export default ProductCard;
