// import { Container, InputGroup, Form, Image } from 'react-bootstrap';

import { React, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import Select from 'react-select';

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

import '../styles/register.css';

import CurrencyLogo from '../img/logoTransparente.png'

import { useState } from "react";


import Footer from '../Components/Footer';
import Api from '../API/Api';


export default function Register() {
  const [user, setUser] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [rutRawValue, setRutRawValue] = useState('');
  const navigate = useNavigate();

  const handleRegistro = async () => {
    try {
      const response = await Api.registroUsuario(user);
      if (response.status === 201) {
        alert('Usuario creado con éxito. Inicia sesión para continuar.');
        navigate('/login');
      } else {
        alert('Ha ocurrido un error al crear el usuario. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      alert('Ha ocurrido un error al crear el usuario. Inténtalo de nuevo más tarde.');
    }
  };


  const formatValue = (inputValue) => {
    const inputWithoutDv = inputValue.replace(/[^0-9]/g, '');
    const dv = inputWithoutDv.slice(-1);
    const numbers = inputWithoutDv.slice(0, -1);
    if (!numbers) {
      return '';
    }
    const formattedNumbers = `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    return `${formattedNumbers}-${dv}`;
  };

  const handleRutChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatValue(value);
    setUser({ ...user, rut: formattedValue });
    setRutRawValue(value);
  };

  const options = [
    { value: 'Cliente', label: 'Cliente' },
    { value: 'Admin', label: 'Admin' }
  ]

  useEffect(() => {
    setOptionsComunas(ApiComunas.comunas.map((comuna) => ({ value: comuna, label: comuna })));
  }, [ApiComunas]);

  return (
    <>
      <MDBContainer className="d-flex">
        <div className="fondo-card d-flex">

          <MDBCard className="card-img">
            <img
              src="https://halliday-v2.s3.amazonaws.com/uploads/sites/12/2022/11/Glasgow-Green-3-Halliday-Lighting-scaled.jpg"
              alt="Login image"
              className="w-100 img-register"
              style={{ height: '600px', width: '1000px' }}
            />
          </MDBCard>

          <MDBCard>
            <MDBRow>
              <MDBCol>
                <img src={CurrencyLogo} style={{width:'15vh'}} />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol>
                <p>Registrar una cuenta</p>
              </MDBCol>
            </MDBRow>
            <form>
              <div className="f-form">

                <MDBRow>
                  <MDBCol className="m-form">
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Nombre'
                      id='form1'
                      type='text'
                      size="lg"
                      onChange={({ target }) => setUser({ ...user, ["nombre"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Apellido'
                      id='form2'
                      type='text'
                      size="lg"
                      onChange={({ target }) => setUser({ ...user, ["apellido_paterno"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>

              </div>

              <div className="f-form">
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Password'
                      id='form3'
                      type='password'
                      size="lg"
                      minLength="6"
                      onChange={({ target }) => setUser({ ...user, ["password"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Correo electrónico'
                      id='form4'
                      type='email'
                      size="lg"
                      onChange={({ target }) => setUser({ ...user, ["email"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>
              </div>

              <div className="f-form">

                <MDBRow>
                  <MDBCol className="m-form">
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='RUT'
                      id='rut'
                      type='text'
                      size="lg"
                      value={rutRawValue}
                      onChange={handleRutChange}
                      placeholder="11111111-1"
                      maxLength={10}
                      pattern="\d{1,2}\.\d{3}\.\d{3}-\d{1,2}"
                      title="El RUT debe tener el siguiente formato: xx.xxx.xxx-x"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Teléfono'
                      id='form5'
                      type='number'
                      size="lg"
                      onChange={({ target }) => setUser({ ...user, ["telefono"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>

              </div>

              <div className="f-form">
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Direccion'
                      id='form6'
                      type='text'
                      size="lg"
                      onChange={({ target }) => setUser({ ...user, ["direccion"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      className="input-login"
                      wrapperClass='mb-2'
                      label='Comuna'
                      id='form6'
                      type='text'
                      size="lg"
                      onChange={({ target }) => setUser({ ...user, ["comuna"]: target.value })}
                    />
                  </MDBCol>
                </MDBRow>
              </div>


              <MDBRow>
                <MDBCol>
                  <Select
                    className='pb-2'
                    defaultValue={selectedOption}
                    onChange={(selectedOption) => {
                      setSelectedOption(selectedOption);
                      setUser({ ...user, ["tipo_user"]: selectedOption.value });
                    }}
                    options={options}
                    isSearchable={false}
                    placeholder='Selecciona un usuario'
                  />
                </MDBCol>
              </MDBRow>
            </form>

            <MDBRow>
              <MDBCol>
                <MDBBtn
                  color='dark'
                  onClick={handleRegistro}>
                  Registrar
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCard>

        </div>
      </MDBContainer>
      <Footer />
    </>
  );
}