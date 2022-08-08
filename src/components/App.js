import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext";

import Habits from "./habits/habits";
import History from "./history";
import Login from "./login";
import Register from "./register";
import Today from "./today/today";

export default function App() {

  const [data, setData] = useState([]);
  const [progresso, setProgresso] = useState(0);

  return (
    <UserContext.Provider value={{ data, setData }} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/hoje" element={<Today />} />
          <Route path="/habitos" element={<Habits />} />
          <Route path="/historico" element={<History />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}