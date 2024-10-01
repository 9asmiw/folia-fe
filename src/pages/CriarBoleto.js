import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarBoleto({ adicionarBoleto }) {
  const [nome, setNome] = useState('');
  const [banco, setBanco] = useState('');
  const [parcela, setParcela] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Aberto'); 

  const navigate = useNavigate();

  const formatarData = (data) => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`; 
  };

  const formatarValor = (valor) => {
    const numero = parseFloat(valor.replace(',', '.')); 
    return `R$${numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const numero = Math.random().toString().slice(2, 12);

    const novoBoleto = {
      status,
      nome,
      numero,
      banco,
      parcela,
      vencimento: formatarData(vencimento), 
      valor: formatarValor(valor),
    };

    adicionarBoleto(novoBoleto);
    navigate('/boletos'); 
  };

  const handleValorChange = (e) => {
    const value = e.target.value.replace(/[^\d,]/g, ''); 
    setValor(value);
  };

  const handleParcelaChange = (e) => {
    const value = e.target.value.replace(/[^\d/]/g, '');
    if (value.length <= 5) {
      setParcela(value);
    }
  };

  return (
    <div>
      <h1>Criar Boleto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Banco:</label>
          <input type="text" value={banco} onChange={(e) => setBanco(e.target.value)} required />
        </div>
        <div>
          <label>Número da Parcela:</label>
          <input
            type="text"
            value={parcela}
            onChange={handleParcelaChange}
            placeholder="0/0"
            required
            maxLength="5"
          />
        </div>
        <div>
          <label>Vencimento:</label>
          <input type="date" value={vencimento} onChange={(e) => setVencimento(e.target.value)} required />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="text"
            value={valor}
            onChange={handleValorChange}
            placeholder="0,00"
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Aberto">Aberto</option>
            <option value="Pago">Pago</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>
        <button type="submit">Adicionar Boleto</button>
      </form>
    </div>
  );
}

export default CriarBoleto;
