import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screen 1/login";
import Register from "./screen 2/register";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}




/*

<Route path="/habitos" element={<Habits/>} />
<Route path="/hoje" element={<Today/>} />
<Route path="/historico" element={<History/>} />

*/