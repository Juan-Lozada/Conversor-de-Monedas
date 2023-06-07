import { NavLink } from 'react-router-dom';

import { 
  Container, 
  Row, 
  Col } 
from 'react-bootstrap';

import '../styles/header.css';

import CurrencyLogo from '../img/logoTransparente.png' 

export default function Header () {
  return (
    <>
      <div className="h-fondo">
        <Container fluid className='h-container'>
          <div>
            <img src={CurrencyLogo} />
          </div>
          <p>Conéctate a la comunidad deportiva y haz match en tu cancha favorita.</p>
          <Row className='b-navlink'>
            <Col>
              <NavLink to='/Login' style={{ textDecoration: 'none', Color: "#BAD7E9" }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  data-mdb-ripple-color="dark">
                  Login
                </button>
              </NavLink>
            </Col>
            <Col>
              <NavLink to='/register' style={{ textDecoration: 'none', Color: "#BAD7E9" }}>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  data-mdb-ripple-color="dark">
                  Register
                </button>
              </NavLink> 
            </Col>
          </Row>     
        </Container> 
      </div>
    </>
  );
};

