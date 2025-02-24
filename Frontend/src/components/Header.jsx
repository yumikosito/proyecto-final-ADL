import { Container, Row, Col } from 'react-bootstrap';


const Header = () => {
  return (
    <div id='header'>
      <Container>
        <Row>
          <Col xs={12} md={6} xl={7}>
            <div className='box rounded-3'>
              <h1 className='mb-3'>Final Fantasy Marketplace</h1>
              <hr className='my-0 py-0'/>
              <p className='mt-3'>El mejor lugar para que puedas vender tu merchandising de todos los Final Fantasy</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Header