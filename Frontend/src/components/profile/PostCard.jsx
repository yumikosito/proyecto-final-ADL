import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import useFetchProducts from "../../assets/hooks/useFetchProducts";
const PostCard = ({ product_name, product_description, product_photo, id_product, product_price, product_quantity }) => {
  const navigate = useNavigate();
  const edit = (idProduct) => {
    navigate(`/perfil/mis-productos/${idProduct}`);
  };

  const totalFormat= new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'}).format(product_price)
  const {user} = useContext(UserContext)

  // const handleDelete = (id) => {

  //   const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
  //   if(!confirm) return;
  //   if (confirm) {
  //     try {
  //       axios.delete(
  //         `http://localhost:3001/api/mis-productos/${id}`,
  //         {
  //           headers: { Authorization: `Bearer ${user.token}` },
  //         }
  //       );
  //       alert("Producto eliminado con id: ", id);
  //       navigate("/perfil/mis-productos");
  //     } catch (error) {
  //       console.log(error)
  //     } 
  //   }
  // };

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
