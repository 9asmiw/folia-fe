// src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, boleto }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalhes do Boleto</h2>
        <p><strong>Status:</strong> {boleto.status}</p>
        <p><strong>Nome:</strong> {boleto.nome}</p>
        <p><strong>Número:</strong> {boleto.numero}</p>
        <p><strong>Banco:</strong> {boleto.banco}</p>
        <p><strong>Parcela:</strong> {boleto.parcela}</p>
        <p><strong>Vencimento:</strong> {boleto.vencimento}</p>
        <p><strong>Valor:</strong> {boleto.valor}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default Modal;
