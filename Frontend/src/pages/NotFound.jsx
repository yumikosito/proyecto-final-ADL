import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import moogleNotFound from "../assets/img/sadMoogle.png"

const NotFound = () => {
  return (
    <div id='notFound' className=''>
      <Container className='my-5 yellowColor py-4 rounded-3'>
        <Row>
         <Col xs={12} sm={6} className='d-flex flex-column align-items-center justify-content-center titleNF'>
          <div >
            <h1>Error 404</h1>
            <h4>Lo sentimos, esta pagina no existe</h4>
          </div>

          </Col>
          <Col xs={12} sm={6}>
            <img className="mt-3 mb-0 moogleImg" src={moogleNotFound} alt="logo"/>
          </Col>

        </Row>
      </Container>
    </div>
  )
}

export default NotFound
