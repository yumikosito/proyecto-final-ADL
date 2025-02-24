import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../assets/hooks/useInput';
import { UserContext } from '../../context/UserContext';

const Address = () => {
  const {userLog,setUserLog} = useContext(UserContext)
  
  let address = userLog.address;
  const addressChange=useInput("")

  const handleSubmit = (e)=>{
    e.preventDefault()
  
    if(addressChange.value!=""){
      address=addressChange.value
    }
    setUserLog({...userLog,address})
    Swal.fire({
      title: "Direccion editada con exito",
      icon: "success",
      confirmButtonColor: "#68D5E8",
      color:"#323232"
    })

      // try {
    //   const response= await axios.put("http://localhost:3001/api/perfil", {userLog})

    //    Swal.fire({
        //   title: "Direccion editada con exito",
        //   icon: "success",
        //   confirmButtonColor: "#68D5E8",
        //   color:"#323232"
        // })
    // } catch (error) {
      // console.error("Error al editar direccion:", error);
    // }
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
               <Form.Label>Direccion actual: {userLog.address}</Form.Label>
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
