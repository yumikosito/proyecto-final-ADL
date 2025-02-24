
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import { Person, Shop, BagPlus, CartCheck} from 'react-bootstrap-icons';
import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ActiveContext } from '../../context/ActiveContext';
import chocoboIcon from "../../assets/img/chocoboIcon.png"

const MenuProfile = () => {
  let {profileActive,setProfileActive} = useContext(ActiveContext)

  let UpdateProfileActive = (value)=>{
    setProfileActive(value);
  }
  

  return (
    <div id='menuProfile' className='yellowColor'>
      <Container>
        <Row>
          <Col xs={12} sm={3} className=''>
            <Row>
              <Col xs={6}>
                <h2 className='pt-4 textProfileTitle'>Mi perfil</h2>
              </Col>
              <Col xs={6}>
                <img className="mt-3 mb-0 chocoboImg" src={chocoboIcon} alt="chocobo profile icon"/>
              </Col>
             </Row>

          </Col>
          <Col xs={12} sm={9}>
            <Nav justify >
              <Nav.Item>
                <Nav.Link as={Link} to="/perfil" className={profileActive==='about-me'? 'rounded-3 textProfile profileLink':'textProfile'} onClick={()=> UpdateProfileActive('about-me')} onLoad={()=> UpdateProfileActive('about-me')}>
                  <Person size={30}/>
                  <p>Mis datos</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/perfil/nueva-venta" onClick={()=> UpdateProfileActive('new-post')} className={profileActive==='new-post'? 'rounded-3 textProfile profileLink':'textProfile'} >
                  <BagPlus size={30}/>
                  <p>Nueva venta</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/perfil/mis-productos" className={profileActive==='my-posts'? ' rounded-3 textProfile profileLink':'textProfile'} onClick={()=> UpdateProfileActive('my-posts')}>
                  <Shop size={30}/>
                  <p>Mis productos</p>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/perfil/pedidos-anteriores" className={profileActive==='my-orders'? 'rounded-3 textProfile profileLink':'textProfile'} onClick={()=> UpdateProfileActive('my-orders')}>
                  <CartCheck size={30}/>
                  <p>Pedidos anteriores</p>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Container>
  </div>
  )
}

export default MenuProfile

