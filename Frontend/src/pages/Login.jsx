import React, { useContext } from 'react'
import { Col, Container, FormGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../assets/hooks/useInput';
import { UserContext } from '../context/UserContext';

const Login = () => {
  const email=useInput("")
  const password=useInput("")


  const {logInUser} = useContext(UserContext)

  const handleSubmit = (e)=> {
    e.preventDefault()
    logInUser({email:email.value, password:password.value})
  }

  return (
    <div className='loginForm'>
      <h1 id='titleText'>Iniciar sesion</h1>
        <Container className='yellowColor py-5 my-5 rounded-3'>
          <Form onSubmit={handleSubmit} className='rounded-3 mx-5 d-flex flex-column align-items-center justify-content-center whiteColor py-3'>
            <Form.Group className="mb-3"  controlId="formBasicEmail">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control required className='registerLoginColor' type="email" placeholder="Vivi@tienda.cl" {...email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control required className='registerLoginColor' type="password" placeholder="Minimo 8 caracteres" {...password} />
            </Form.Group>

         
          <div className='registerLoginInput'>
              <Button className='registerLoginButton registerLoginInput' variant="info" type="submit">
                <p className='registerLoginButtonText'>Iniciar sesion</p>
              </Button>
              <a href="">¿Olvidaste tu contraseña?</a>
          </div>

          </Form>
        </Container>
    </div>
  )
}

export default Login