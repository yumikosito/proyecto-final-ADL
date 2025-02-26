import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext';


const Cartaddress = () => {
  const {user} = useContext(UserContext)
  console.log(user);
  

  return (
    <div id='cartAddress' className='p-3 mb-3 mx-2 rounded-3 border-2' >
      <Container>
          <p className='cartOrderTitle pt-2 mb-2'>Direccion de envío</p>
        <Row className='d-flex flex-column mb-3'>
         <p className='mb-1 cartOrderSub'>{user.address}</p>
  
        </Row>
      </Container>
    </div>
  )
}

export default Cartaddress
