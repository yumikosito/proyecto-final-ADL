import React from "react";
import { redirect, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Form, FormGroup, Button } from "react-bootstrap";
import MenuProfile from "../components/profile/MenuProfile";
import { UserContext } from "../context/UserContext";
import useInput from "../assets/hooks/useInput";
import axios from "axios";
import Swal from "sweetalert2";

const EditPost = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user } = useContext(UserContext);
  const navigate = useNavigate()

  const name = useInput("");
  const description = useInput("");
  const price = useInput("");
  const quantity = useInput("");
  const photo = useInput("");
  const category = useInput("");

  // useEffect(() => {
  //   const getProduct = async () => {
  //     if (products.length > 0) {
  //       const id_params = Number(id);
  //       const productFound = products.find(
  //         (prod) => prod.id_product === id_params
  //       );
  //       setProduct(productFound);
  //     }
  //   };
  //   getProduct();
  // }, [id, products]);
  const handleEdit = async (e) => {
    e.preventDefault();

    const newDataUser = {
      product_name: name.value,
      product_description: description.value,
      product_price: price.value,
      product_quantity: quantity.value,
      product_photo: photo.value,
      product_category: category.value,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/productos/mis-productos/editar/${id}`,
        newDataUser,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      Swal.fire({
        title: "Edición exitosa",
        icon: "success",
        confirmButtonColor: "#68D5E8",
        color: "#323232",
      });
      navigate('/perfil/mis-productos/')
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/productos/mis-productos/${id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setProduct(response.data);

         name.onChange({target: {value: response.data.product_name}})
         description.onChange({target: {value: response.data.product_description}})
         price.onChange({target: {value: response.data.product_price}})
         quantity.onChange({target: {value: response.data.product_quantity}})
         photo.onChange({target: {value: response.data.product_photo}})
         category.onChange({target: {value: response.data.product_category}})

      } catch (error) {
        a;
        console.error("Error al obtener el producto:", error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      <MenuProfile />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Container className="m-4">
          <Row className="m-3 d-flex justify-content-center">
            <Col>
              <h2 className="title-acme">Editar producto</h2>
            </Col>
          </Row>
          <Form onSubmit={handleEdit}>
            <Row>
              <Col md={12} lg={6} className="px-5">
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    className="editPostColor"
                    type="text"
                    placeholder={product.product_name || name.value}
                    {...name}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Foto URL</Form.Label>
                  <Form.Control
                    className="editPostColor"
                    type="text"
                    placeholder={product.product_photo || photo.value}
                    {...photo}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicUsername"
                  {...category}
                >
                  <Form.Label>Categoría</Form.Label>

                  <Form.Select className="editPostColor">
                    <option value="">Selecciona una categoría</option>
                    <option value="Figura">Figura</option>
                    <option value="Peluche">Peluche</option>
                    <option value="Pixel art">Pixel art</option>
                    <option value="Musica">Música</option>
                    <option value="Juego fisico">Juego físico</option>
                    <option value="Papeleria">Papelería</option>
                    <option value="Vajilla">Vajilla</option>
                    <option value="Accesorio">Accesorios</option>
                    <option value="Ropa">Ropa</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} lg={6} className="px-5 mb-4">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    className="editPostColor"
                    type="text"
                    placeholder={product.product_price || price.value}
                    {...price}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Cantidad</Form.Label>
                  <Form.Control
                    className="editPostColor"
                    type="text"
                    placeholder={product.product_quantity || description.value}
                    {...quantity}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    className="editPostColor"
                    as="textarea"
                    rows={6}
                    placeholder={
                      product.product_description || description.value
                    }
                    {...description}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="d-flex justify-content-center">
              <Button className="editButton p-0 " variant="info" type="submit">
                <p className="registerLoginButtonText">Editar</p>
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default EditPost;
