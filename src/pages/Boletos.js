import React from 'react';
import { Link } from 'react-router-dom'; // Certifique-se de importar Link para navegação
import { AiFillEye, AiOutlineDownload, AiOutlinePrinter, AiOutlineDollarCircle } from 'react-icons/ai';
import './Boletos.css'; // Ajuste o caminho conforme necessário

const Boletos = ({ boletos }) => {
  return (
    <div className="boletos-container">
      <h1>Boletos</h1>
      
      {/* Adicionando o botão de Criar Boleto */}
      <div className="create-boleto-container">
        <Link to="/criar-boleto" className="create-boleto-button">
          Adicionar Boleto
        </Link>
      </div>

      <table className="boletos-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Nome</th>
            <th>Número</th>
            <th>Banco</th>
            <th>Parcela</th>
            <th>Vencimento</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {boletos && boletos.length > 0 ? (
            boletos.map((boleto, index) => (
              <tr key={index} className={`boleto-row ${boleto.status.toLowerCase()}`}>
                <td className={`status-cell ${boleto.status.toLowerCase()}`}>{boleto.status}</td>
                <td>{boleto.nome}</td>
                <td>{boleto.numero}</td>
                <td>{boleto.banco}</td>
                <td>{boleto.parcela}</td>
                <td>{boleto.vencimento}</td>
                <td>{boleto.valor}</td>
                <td>
                  <AiFillEye className="icon" />
                  <AiOutlineDownload className="icon" />
                  <AiOutlinePrinter className="icon" />
                  <AiOutlineDollarCircle className="icon" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Nenhum boleto disponível</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Boletos;
