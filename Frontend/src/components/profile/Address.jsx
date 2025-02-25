import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../assets/hooks/useInput';
import { UserContext } from '../../context/UserContext';
import Swal from 'sweetalert2';
import axios from 'axios';

const Address = () => {
  const {user, userLog,setUserLog,profileUser} = useContext(UserContext)
  
  const addressChange=useInput("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    console.log(addressChange);
    
    try {
      const res =  await axios.put("http://localhost:3000/api/usuarios/editar-direccion", {addressChange: addressChange.value},{
      headers:{
              Authorization:`Bearer ${user.token}`,
          },})

       if (res.data.msg=="La dirección se modificó con éxito"){
          profileUser()

          Swal.fire({
            title:"La dirección se modificó con éxito",
            icon: "success",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

        } else if (res.data.msg="Dirección es la misma que tenía antes") {
          Swal.fire({
            title: "Dirección es la misma que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else {
          Swal.fire({
            title: "No se pudo modificar la dirección del usuario",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        }
      
      
    } catch (error) {
      console.error("Error al editar datos:", error);
    }
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
