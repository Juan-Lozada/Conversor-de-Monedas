import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ContextOrigin from "../Context";
const { Context } = ContextOrigin;
import Api from "../API/Api.jsx";
import Conversor from "./Conversor";
import ChartComponent from "./ChartComponent";

export default function AdminDashboard() {
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const dataUser = async () => {
      const resp = Api.getUser(id);
      const usuario = await resp;
      console.log(usuario)
    }
    dataUser();
  }, [])

  return (
    <div className="tenant-profile p-5">
      <Row className="justify-content-center p-5">
        <Conversor/>
        <ChartComponent/>
      </Row>
    </div>
  );
}
