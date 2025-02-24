import React, { useContext, useState } from 'react'
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../assets/hooks/useInput';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';


const Register = () => {
  const name=useInput("");
  const lastname=useInput("");
  const username=useInput("");
  const birthday=useInput("");
  const password=useInput("");
  const password_confirm=useInput("");
  const email=useInput("");
  const email_confirm=useInput("");

  const {registerUser}=useContext(UserContext)

  const handleSubmit = (e)=> {
    e.preventDefault()

    let passConfirmed=false
    let emailConfirmed=false

    if (password.value===password_confirm.value && password.value.length>=8){
      passConfirmed=true
    } else if (password.value.length<8) {
      Swal.fire({
            title: "Contraseña tiene que tener 8 caracteres mínimo",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
    } else{
      Swal.fire({
        title: "Contraseñas no son iguales",
        icon: "error",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
    }
    if (email.value===email_confirm.value){
      emailConfirmed=true
    }  else{
      Swal.fire({
        title: "Emails no son iguales",
        icon: "error",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
}
    
    if(passConfirmed==true && emailConfirmed==true){
      registerUser(
        { email: email.value,
          email_confirm: email_confirm.value,
          password: password.value,
          password_confirm: password_confirm.value,
          username:username.value,
          name: name.value,
          lastname: lastname.value,
          birthday: birthday.value,
          address:"No tiene direccion agregada"
        })
    }

  }

  return (
    <div className='registerForm'>
      <h1 id='titleText'>Registrar nueva cuenta</h1>
      <div className=' py-2 my-3 '>
        <Container className='yellowColor py-5 rounded-3'>
          <Form onSubmit={handleSubmit} className='whiteColor py-3 rounded-3 mx-5' >
          <Row>
            <Col md={12} lg={6} className='px-5'>
              <Form.Group className="mb-3"  controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control required className='registerLoginColor' type="text" placeholder="Vivi" {...name} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLastname">
                <Form.Label>Apellido</Form.Label>
                <Form.Control required className='registerLoginColor' type="text" placeholder="Ornitier" {...lastname} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control required className='registerLoginColor' type="text" placeholder="Vivi_tienda" {...username} />
              </Form.Group>

              <FormGroup className="mb-3" controlId="formBirthday">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control required className='registerLoginColor' type="date" placeholder="Vivi_tienda" {...birthday} />
              </FormGroup>

     
            </Col>
            <Col md={12} lg={6} className='px-5 mb-4'>
             <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control required className='registerLoginColor' type="text" placeholder="Minimo 8 caracteres" {...password} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPasswordConfirm">
                <Form.Label>Repite tu contraseña</Form.Label>
                <Form.Control required className='registerLoginColor' type="text" placeholder="" {...password_confirm}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo electronico</Form.Label>
                <Form.Control required className='registerLoginColor' type="email" placeholder="vivi@tienda.cl" {...email} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmailConfirm">
                <Form.Label>Repite tu correo electronico</Form.Label>
                <Form.Control required className='registerLoginColor' type="email" placeholder="vivi@tienda.cl" {...email_confirm} />
              </Form.Group>
            </Col>
          </Row>

          <Row className='registerLoginInput'>
            <Form.Group className="mb-3" controlId="formCheckbox">
              <Form.Check  className='registerLoginInput2' type="checkbox" label="Aceptas los terminos de contrato" />
            </Form.Group>
              <Button className='registerLoginButton registerLoginInput' variant="info" type="submit">
                <p className='registerLoginButtonText'>Registrarse</p>
              </Button>
          </Row>

          </Form>
        </Container>
      </div>
    </div>
  )
}

export default Register