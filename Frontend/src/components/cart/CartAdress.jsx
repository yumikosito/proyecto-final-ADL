import React, { useContext } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { CheckLg } from 'react-bootstrap-icons'
import { UserContext } from '../../context/UserContext';


const Cartaddress = () => {
  const {userLog} = useContext(UserContext)

  return (
    <div id='cartAddress' className='p-3 mb-3 mx-2 rounded-3 border-2' >
      <Container>
          <p className='cartOrderTitle pt-2 mb-2'>Direccion de envío</p>
        <Row className='d-flex flex-column mb-3'>
         <p className='mb-1 cartOrderSub'>{userLog.address}</p>
  
        </Row>
      </Container>
    </div>
  )
}

export default Cartaddress
