import "bootstrap/dist/css/bootstrap.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Context from "./Context";
import Login from "./Views/Login";
import Register from "./Views/Register";

import UserHome from "./Views/UserHome";
import AdminHome from "./Views/AdminHome";


const { Provider } = Context;

function App() {
  return (
    <div className="App" >
      <Provider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/logout" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/dashboard/:id" element={<UserHome />} />
            <Route path="/admin/dashboard/:id" element={<AdminHome />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App;
