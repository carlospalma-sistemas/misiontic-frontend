import React from 'react';
import Header from './componentes/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listatareas from './componentes/Listatareas';
import Inicio from './componentes/Inicio';
import Formtareas from './componentes/Formtareas';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false}/> 
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Inicio/>} exact/>
          <Route path = '/tareas' element = {<Listatareas/>} exact/>
          <Route path = '/tareas/form' element = {<Formtareas/>} exact/>
          <Route path = '/tareas/form/:id' element = {<Formtareas/>} exact/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
