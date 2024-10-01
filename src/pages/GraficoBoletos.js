import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const GraficoBoletos = ({ boletos = [] }) => { // Define boletos como array vazio por padrão
  const [periodo, setPeriodo] = useState('Último Mês');
  const [dadosGrafico, setDadosGrafico] = useState({});

  // Função para calcular os dados do gráfico com base no período selecionado
  const calcularDadosGrafico = (periodo) => {
    if (!boletos || boletos.length === 0) return; // Verifica se boletos está vazio ou undefined

    const hoje = new Date();
    let dataInicio;

    switch (periodo) {
      case 'Último Dia':
        dataInicio = new Date(hoje.setDate(hoje.getDate() - 1));
        break;
      case 'Última Semana':
        dataInicio = new Date(hoje.setDate(hoje.getDate() - 7));
        break;
      case 'Último Mês':
        dataInicio = new Date(hoje.setMonth(hoje.getMonth() - 1));
        break;
      case 'Último Ano':
        dataInicio = new Date(hoje.setFullYear(hoje.getFullYear() - 1));
        break;
      case 'Últimos 5 Anos':
        dataInicio = new Date(hoje.setFullYear(hoje.getFullYear() - 5));
        break;
      default:
        dataInicio = new Date(hoje.setMonth(hoje.getMonth() - 1));
    }

    // Filtra os boletos pelo período selecionado
    const boletosFiltrados = boletos.filter((boleto) => {
      const dataVencimento = new Date(boleto.vencimento.split('/').reverse().join('-')); // Converte para data
      return dataVencimento >= dataInicio;
    });

    // Agrupa os boletos por data de vencimento
    const boletosAgrupados = boletosFiltrados.reduce((acc, boleto) => {
      const dataVenc = boleto.vencimento;
      acc[dataVenc] = (acc[dataVenc] || 0) + 1;
      return acc;
    }, {});

    // Prepara os dados para o gráfico
    const labels = Object.keys(boletosAgrupados).sort(
      (a, b) => new Date(a.split('/').reverse().join('-')) - new Date(b.split('/').reverse().join('-'))
    );
    const valores = Object.values(boletosAgrupados);

    setDadosGrafico({
      labels,
      datasets: [
        {
          label: 'Número de Boletos',
          data: valores,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  // Atualiza o gráfico ao mudar o período ou os boletos
  useEffect(() => {
    calcularDadosGrafico(periodo);
  }, [periodo, boletos]);

  return (
    <div>
      <h2>Gráfico de Boletos</h2>
      <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
        <option>Último Dia</option>
        <option>Última Semana</option>
        <option>Último Mês</option>
        <option>Último Ano</option>
        <option>Últimos 5 Anos</option>
      </select>
      {dadosGrafico.labels ? <Line data={dadosGrafico} /> : <p>Sem dados para exibir</p>}
    </div>
  );
};

export default GraficoBoletos;
