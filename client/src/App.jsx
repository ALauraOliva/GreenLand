// Este es el componente principal de la app, aquí se renderizan los distintos componentes de la interfaz
import React from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { NavBar } from "./components/NavBar/NavBar";
import { Landing } from "./components/Landing/Landing";
import { Footer } from "./components/footer/Footer";
import { Products } from "./components/Products/Products";
import { Login }  from "./components/Login/Login";
import { SignUp } from "./components/SignUp/SignUp";
import { About } from "./components/About/About";
import { Form } from "./components/Form/Form";
{/* //borrar despues */}
import { Detail } from "./components/Detail/Detail";
import { ContactUs } from "./components/ContactUs/ContactUs"

function App() { 
  const location = useLocation();

  return (
    /*Estilos para el scroll-bar, pendiente de modularizar*/
    <div className="containerScroll">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/shop" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/form" element={<Form/>}/>
        {/* //borrar despues */}
        <Route path="/detail/:id" element={<Detail />}/>
        <Route path="/contact" element={<ContactUs/>}/>
      </Routes>
      <Footer/>
    </div>  
  )
}

export default App;