import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Boletos from './pages/Boletos';
import CriarBoleto from './pages/CriarBoleto';
import NotaFiscais from './pages/NotaFiscais';
import Acompanhamento from './pages/Acompanhamento';
import Conta from './pages/Conta';
import './App.css';
import logo from './assets/logo.png';
import { FaHome, FaBarcode, FaListAlt, FaTruck, FaUserCircle } from 'react-icons/fa';

function App() {
  const [boletos, setBoletos] = useState([
    {
      status: "Aberto",
      nome: "Pre. ADS ago 2024",
      numero: "0123456789",
      banco: "B. Brasil",
      parcela: "8/12",
      vencimento: "08/08/2024",
      valor: "R$1.345,00"
    },
    {
      status: "Vencido",
      nome: "Pre ESOFT ago 2024",
      numero: "0123456789",
      banco: "B. Brasil",
      parcela: "8/12",
      vencimento: "08/08/2024",
      valor: "R$1.750,00"
    },
    {
      status: "Pago",
      nome: "Pre ECOMP ago 2024",
      numero: "0123456789",
      banco: "B. Brasil",
      parcela: "8/12",
      vencimento: "08/08/2024",
      valor: "R$1.500,00"
    }
  ]);

  const adicionarBoleto = (novoBoleto) => {
    setBoletos((prevBoletos) => [...prevBoletos, novoBoleto]);
  };

  return (
    <Router>
      {/* Header visível em todas as páginas */}
      <header className="header">
        <nav className="nav-bar">
          <img src={logo} alt="Logo" className="logo" />
          <ul className="nav-list">
            <li>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                <FaHome className="nav-icon" /> Início
              </NavLink>
            </li>
            <li>
              <NavLink to="/boletos" activeClassName="active" className="nav-link">
                <FaBarcode className="nav-icon" /> Boletos
              </NavLink>
            </li>
            <li>
              <NavLink to="/nota-fiscais" activeClassName="active" className="nav-link">
                <FaListAlt className="nav-icon" /> Nota Fiscais
              </NavLink>
            </li>
            <li>
              <NavLink to="/acompanhamento" activeClassName="active" className="nav-link">
                <FaTruck className="nav-icon" /> Acompanhamento
              </NavLink>
            </li>
            <li>
              <NavLink to="/conta" activeClassName="active" className="nav-link">
                <FaUserCircle className="nav-icon" /> Conta
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      {/* Rotas do aplicativo */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boletos" element={<Boletos boletos={boletos} />} />
          <Route path="/criar-boleto" element={<CriarBoleto adicionarBoleto={adicionarBoleto} />} />
          <Route path="/nota-fiscais" element={<NotaFiscais />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/conta" element={<Conta />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
