import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../assets/hooks/useInput';
import { UserContext } from '../../context/UserContext';

const Address = () => {
  const {user, editAddress} = useContext(UserContext)
  
  const addressChange=useInput("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    editAddress(addressChange)
  }


  return (
    <div className='myAccount'>
      <Container className='whiteColor mb-3'>
        <Row>
          <Col>
            <h1 id='titleProfile' className='my-4'>Mi dirección</h1>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit} >
          <Row>
            <Col xs={12} sm={8}>
              <Form.Group className="mb-3"  controlId="formBasicAddress">
               <Form.Label>Direccion actual: {user.address}</Form.Label>
               <Form.Control className='addressColor' type="text" placeholder="Numero calle, comuna, ciudad, region, pais, codigo postal" {...addressChange} />
              </Form.Group>
            </Col>
          </Row>
          <Row className=' align-items-start'>
            <Button className='registerLoginButton registerLoginInput mt-4' variant="info" type="submit">
              <p className='registerLoginButtonText'>Editar</p>
            </Button>
          </Row>

  
        </Form>
      </Container>
    </div>
  )
}

export default Address
