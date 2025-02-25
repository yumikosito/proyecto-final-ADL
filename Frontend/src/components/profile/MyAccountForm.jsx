import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../assets/hooks/useInput';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyAccountForm = () => {

  const {user,profileUser,userLog,setUserLog, setUser}=useContext(UserContext);
  const [userChange, setUserChange] = useState([])
  useEffect(()=>{
    profileUser()
  },[])
  

  const nameChange=useInput("")
  const lastnameChange=useInput("")
  const passwordChange=useInput("")
  const emailChange=useInput("");

  
  const handleSubmit = async (e)=> {
    e.preventDefault()

      try {
      const res =  await axios.put("http://localhost:3000/api/usuarios/editar-perfil", {nameChange: nameChange.value, lastnameChange: lastnameChange.value, passwordChange: passwordChange.value, emailChange: emailChange.value},{
      headers:{
              Authorization:`Bearer ${user.token}`,
          },})

       if (res.data.msg=="El usuario se modificó con éxito"){

          profileUser()


            Swal.fire({
              title: "Perfil editado con exito",
              icon: "success",
              confirmButtonColor: "#68D5E8",
              color:"#323232"
            })

        } else if (res.data.msg="Email es el mismo que tenía antes") {
          Swal.fire({
            title: "Email es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else if(res.data.msg=="Email ya existe en uso"){
          Swal.fire({
            title: "Email ya existe en uso",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else if(res.data.msg=="Nombre es el mismo que tenía antes"){
          Swal.fire({
            title: "Nombre es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else if(res.data.msg=="Apellido es el mismo que tenía antes"){
          Swal.fire({
            title: "Apellido es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else if(res.data.msg=="Contraseña es la misma que tenía antes"){
          Swal.fire({
            title: "Nombre es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else {
          Swal.fire({
            title: "No se pudo modificar el usuario",
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
            <h1 id='titleProfile' className='my-4'>Mis datos</h1>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit} >
          <Row>
            <Col md={12} lg={6} className='px-5'>
              <Form.Group className="mb-3"  controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control className='registerLoginColor' type="text"
                placeholder={user.name} {...nameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Apellido</Form.Label>
                <Form.Control className='registerLoginColor' type="text"
                placeholder={user.lastname} {...lastnameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control disabled className='registerLoginColor' type="text"
                placeholder={user.username}
                />
              </Form.Group>

              <FormGroup className="mb-3" controlId="formBasicBirthday">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control disabled className='registerLoginColor' type="text"
                placeholder={user.birthday}
                />
              </FormGroup>

     
            </Col>
            <Col md={12} lg={6} className='px-5 mb-4'>
             <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control disabled className='registerLoginColor' type="text" placeholder="**********" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicpasswordChange">
                <Form.Label>Cambiar contraseña</Form.Label>
                <Form.Control  className='registerLoginColor' type="text"
                placeholder="" {...passwordChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control disabled className='registerLoginColor' type="email"
                placeholder={user.email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmailChange">
                <Form.Label>Cambiar correo electronico</Form.Label>
                <Form.Control className='registerLoginColor' type="email"
                placeholder="" {...emailChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='registerLoginInput align-items-start'>
              <Button className='registerLoginButton registerLoginInput' variant="info" type="submit">
                <p className='registerLoginButtonText'>Editar</p>
              </Button>
          </Row>

        </Form>

  </Container>
  </div>
  )
}

export default MyAccountForm
