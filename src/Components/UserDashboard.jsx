import {
  Container,
  Card,
}
  from "react-bootstrap";

import { useContext, useState, useEffect } from "react";
import Api from "../API/Api.jsx";

import ContextOrigin from "../Context";

const { Context } = ContextOrigin;

import '../styles/userdashboard.css';
import { useParams } from "react-router-dom";
import Conversor from "./Conversor.jsx";



export default function UserDashboard() {
  const { session } = useContext(Context);

  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const dataUser = async () => {
      const resp = Api.getUser(id);
      const usuario = await resp;
      console.log(usuario)
      console.log(session)
    }
    dataUser();
  }, [])

  return (
    <>
      <Container className="d-flex">
        <div className="fondo-card d-flex">
          <Card className="d-flex justify-content-center gap-3 p-5">
            <Conversor />
          </Card>
        </div>
      </Container>
    </>
  );
}
