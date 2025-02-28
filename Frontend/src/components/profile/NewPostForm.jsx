import React, { useContext, useEffect} from 'react'
import { Col, Container, FloatingLabel, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../assets/hooks/useInput';
import { ProductContext } from '../../context/ProductContext';
import SearchProducts from '../search/SearchProducts';
import SearchResult from '../search/SearchResult';


const NewPostForm = () => {
  const {newProduct, resultProduct, setResultProduct} = useContext(ProductContext)

  
  const product_name=useInput("");
  const product_price=useInput("");
  const product_quantity=useInput("");
  const product_photo=useInput("");
  const product_description=useInput("");
  const product_category=useInput("");
  const search=useInput("")

  useEffect(() => {
    if (resultProduct.product_name){
      product_name.onChange({target: {value: resultProduct.product_name}})
      product_photo.onChange({target: {value: resultProduct.product_photo}})
      product_category.onChange({target: {value: resultProduct.product_category}})
      product_description.onChange({target: {value: resultProduct.product_description}})
    }
  }, [resultProduct]);


  const handleSubmit = async (e)=> {
    e.preventDefault()
    newProduct(product_name, product_price, product_quantity, product_photo, product_description, product_category) 
  }


  return (
    <div className='newProduct'>
      <Container>
       <Row>
          <Col>
            <h1 id='titleProfile' className='my-4'>Nuevo producto</h1>
          </Col>
        </Row>
      </Container>
      <Container className='d-flex flex-column justify-content-center align-items-start'>
        <SearchProducts/>
        <SearchResult/>
      </Container>

      <Container>
       <hr/>
      </Container>


      <Container className='my-4 '>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col xs={12} sm={5}>
              <Form.Group controlId="formProductName" className='mb-3'>
                <Form.Label>Nombre del producto</Form.Label>
                  <Form.Control required className='newPostColor' type="name" placeholder="Figura Garnet FFXIV" {...product_name }/>
              </Form.Group>
            </Col>
            <Col xs={12} sm={5}>
            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>{"Foto (URL)"}</Form.Label>
                <Form.Control required className='newPostColor' placeholder="http://www.foto.com/foto" {...product_photo} />
              </Form.Group>

  
            </Col>
            <Col xs={12} sm={2}>
              <Form.Group as={Col} controlId="formGridPassword" className='mb-3'>
                <Form.Label>{"Precio ($ CLP)"}</Form.Label>
                <Form.Control required className='newPostColor' type="number" placeholder="20000" {...product_price} />
              </Form.Group>
    
            </Col>
          </Row>

          <Row>
            <Col xs={12} sm={4} className='d-flex flex-column'>
              <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control required className='newPostColor' placeholder="3" {...product_quantity} />
              </Form.Group>

              <Form.Group controlId="formCategory" className='mb-3'>
                <Form.Label>Categoria</Form.Label>
                <Form.Select className='newPostColor' {...product_category}>
                  <option>Seleciona solo 1 categoria de abajo</option>
                  <option>Figura</option>
                  <option>Peluche</option>
                  <option>Pixel art</option>
                  <option>Musica</option>
                  <option>Juego fisico</option>
                  <option>Papeleria</option>
                  <option>Vajilla</option>
                  <option>Accesorios</option>
                  <option>Ropa</option>
                </Form.Select >
              </Form.Group>

            </Col>
            <Col xs={12} sm={8}>
              <Form.Group>
                <Form.Label>Descripcion</Form.Label>
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Dimensiones, fabricante, origen, etc."
                  className="mb-3"
                >
                  <Form.Control required className='textareaColor' as="textarea" {...product_description}/>
                </FloatingLabel>
              </Form.Group>

            </Col>
          
           </Row>
          
            <Row className='registerLoginInput my-3'>
              <Button className='registerLoginButton registerLoginInput' variant="info" type="submit">
                <p className='registerLoginButtonText'>Publicar nuevo producto</p>
              </Button>
            </Row>
        </Form>
      </Container>
      
  </div>
  )
}

export default NewPostForm
