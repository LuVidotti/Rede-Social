import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./pages/Principal";
import Cadastrar from "./pages/Cadastrar";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import AddAmigo from "./pages/AddAmigo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />}/>
        <Route path="/cadastrar" element={<Cadastrar />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/perfil" element={<Perfil />}/>
        <Route path="/adicionar-amigo" element={<AddAmigo />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
