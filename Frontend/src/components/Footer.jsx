import { Col, Container, Row } from 'react-bootstrap';
import logo from '../assets/img/moogle.png'
import { Facebook,Instagram, TwitterX, PinMapFill, EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons';

const Footer = () => {
  return (
    <footer className='footer skyBlue'>
      <Container>
        <Row className=" d-flex justify-content-between">
          <Col className='mt-4 d-flex justify-content-center' xs={12} sm={4} >
            <Row >
              <Col xs={6} className='mt-0'>
                <p className='titleConfig mt-4'>Final Fantasy Marketplace</p>
              </Col>
              <Col xs={6}>
               <img className="mb-0" src={logo} width="150" height="150" alt="logo footer moogle"/>
              </Col>
            </Row>
          </Col>
        
          <Col xs={6} sm={4} className='mt-4'>
            <h5>¡Visitanos!</h5>
            <Row xs="auto">
              <Col xs={1} className='me-2 mb-2'>
                <Facebook size={25}/>
              </Col>
              <Col xs="auto">
                <a href='www.facebook.com/FF_market' className='footerTextSocialContact'>Facebook</a>
              </Col>
            </Row>
            <Row xs="auto">
              <Col xs={1} className='me-2 mb-2'>
                <Instagram size={25}/>
              </Col>
              <Col>
                <a href='www.instagram.com/FF_market' className='footerTextSocialContact'>Instagram</a>
              </Col>
            </Row>

            <Row xs="auto">
              <Col xs={1} className='me-2 mb-2'>
                <TwitterX size={25}/>
              </Col>
              <Col xs="auto">
              <a href='www.x.com/FF_market' className='footerTextSocialContact'>Twitter/X</a>
              </Col>
            </Row>
          </Col>

          <Col xs={6} sm={4} className='mt-4'>
            <h5>¡Contáctanos!</h5>
            <Row xs="auto">
              <Col xs={1} className='me-2'>
                <TelephoneFill size={25}/>
              </Col>
              <Col xs="auto">
                <p className='footerTextSocialContact'>+56 9 1111 1111</p>
              </Col>
            </Row>
            <Row xs="auto">
              <Col xs={1} className='me-2'>
                <EnvelopeFill size={25}/>
              </Col>
              <Col>
                <p className='footerTextSocialContact'>ff_market@gmail.com</p>
              </Col>
            </Row>

            <Row xs="auto">
              <Col xs={1} className='me-2'>
                <PinMapFill size={25}/>
              </Col>
              <Col xs="auto">
              <p className='footerTextSocialContact'>Calle 8, Lindblum, Gaia</p>
              </Col>
            </Row>
          </Col>

          <Row >
            <Col className='footer-text'>
             <p >Todos los derechos reservados. FF Market 2025 ©</p>
            </Col>
          </Row>

        </Row>
      </Container>
    </footer>
  )
}

export default Footer