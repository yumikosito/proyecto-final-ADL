import React from 'react'
import MenuProfile from '../components/profile/MenuProfile'
import MyAccountForm from '../components/profile/MyAccountForm'
import { Container, Row, Col } from 'react-bootstrap'
import Address from '../components/profile/Address'
import { ActiveProvider } from '../context/ActiveContext'
import DeleteUser from '../components/profile/DeleteUser'

const Profile = () => {
  return (
    <div>
      <MenuProfile/>
      <Container>
        <MyAccountForm/>
          <hr className='my-4'/>   
        <Address/>
        <hr className='my-4'/>  
        <DeleteUser/>
      </Container>
    </div>
  )
}

export default Profile