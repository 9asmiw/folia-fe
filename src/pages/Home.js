// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css'; // Certifique-se de que o arquivo Home.css esteja no mesmo diretório e contenha o estilo Poppins

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {
  const [boletos, setBoletos] = useState([]);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);

  // Geração de boletos fictícios para o gráfico
  useEffect(() => {
    const gerarBoletos = () => {
      const boletosGerados = [];
      for (let i = 0; i < 100; i++) {
        const mesAleatorio = Math.floor(Math.random() * 12); // Gera um número de 0 a 11 (meses)
        const diaAleatorio = Math.floor(Math.random() * 28) + 1; // Gera um dia de 1 a 28
        const anoAleatorio = 2024; // Pode ser alterado para outros anos, se necessário
        const dataVencimento = new Date(anoAleatorio, mesAleatorio, diaAleatorio);
        
        boletosGerados.push({
          id: i + 1,
          nome: `Boleto ${i + 1}`,
          vencimento: dataVencimento, // Data de vencimento em formato Date
        });
      }

      setBoletos(boletosGerados);
    };

    gerarBoletos();
  }, []);

  // Filtra os boletos com base na data de início e fim selecionadas
  useEffect(() => {
    if (dataInicio && dataFim) {
      const filtrados = boletos.filter((boleto) => {
        return boleto.vencimento >= dataInicio && boleto.vencimento <= dataFim;
      });
      setDadosFiltrados(filtrados);
    }
  }, [dataInicio, dataFim, boletos]);

  // Lógica para agrupar boletos por mês e gerar dados para o gráfico
  const gerarDadosGrafico = () => {
    const totalBoletosPorMes = Array(12).fill(0); // Array para contar os boletos em cada mês
    dadosFiltrados.forEach((boleto) => {
      const mes = boleto.vencimento.getMonth(); // Retorna o índice do mês (0 a 11)
      totalBoletosPorMes[mes] += 1; // Incrementa a contagem de boletos no mês correspondente
    });

    return {
      labels: [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      datasets: [
        {
          label: 'Boletos vencidos',
          data: totalBoletosPorMes,
          borderColor: '#FF9999', // Linha vermelha clara
          backgroundColor: 'rgba(255, 102, 102, 0)', // Sem preenchimento
          borderWidth: 2, // Espessura da linha
          pointRadius: 0, // Remove os pontos da linha
          tension: 0.4, // Curvatura da linha (deixa a linha mais arredondada)
          fill: false, // Remove preenchimento
        },
      ],
    };
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>Início</h1>

      {/* Seletor de Data de Início e Fim - Ajustado para ser menor e no canto superior direito do gráfico */}
      <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'flex-end', width: '60%', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          <label style={{ fontFamily: 'Poppins, sans-serif' }}>De: </label>
          <DatePicker
            selected={dataInicio}
            onChange={(date) => setDataInicio(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Inicio"
            popperPlacement="bottom-end" // Ajusta a posição do popper
            style={{ 
              border: 'none', 
              outline: 'none', 
              width: '80px', // Largura reduzida
              height: '20px', 
              borderBottom: '1px solid #333', // Apenas uma linha inferior
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '14px', 
              marginBottom: '5px', // Pequeno espaço inferior
            }} 
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
          <label style={{ fontFamily: 'Poppins, sans-serif' }}>até: </label>
          <DatePicker
            selected={dataFim}
            onChange={(date) => setDataFim(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Fim"
            popperPlacement="bottom-end" // Ajusta a posição do popper
            style={{ 
              border: 'none', 
              outline: 'none', 
              width: '80px', // Largura reduzida
              height: '20px', 
              borderBottom: '1px solid #333', // Apenas uma linha inferior
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '14px', 
              marginBottom: '5px', // Pequeno espaço inferior
            }} 
          />
        </div>
      </div>

      {/* Gráfico de Linha com Estilização */}
      <div style={{ width: '60%', height: '250px', padding: '20px', backgroundColor: 'transparent' }}>
        <Line data={gerarDadosGrafico()} options={{
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  family: 'Poppins, sans-serif',
                },
                color: '#333333', // Cor das labels do gráfico
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  family: 'Poppins, sans-serif', // Aplica a fonte Poppins
                  size: 12, // Tamanho da fonte menor
                },
                color: '#333333',
              },
              grid: {
                display: false, // Remove linhas verticais do gráfico
              },
            },
            y: {
              ticks: {
                font: {
                  family: 'Poppins, sans-serif', // Aplica a fonte Poppins
                  size: 12, // Tamanho da fonte menor
                },
                color: '#333333',
              },
              beginAtZero: true,
              precision: 0, // Ajusta o número de casas decimais
              grid: {
                display: false, // Remove linhas horizontais do gráfico
              },
            },
          },
          interaction: {
            mode: 'nearest', // A bolinha só aparece no ponto mais próximo
            intersect: false, // Permite que a bolinha apareça mesmo sem intersectar com o cursor
            axis: 'x', // Limita a interação ao eixo x
          },
          elements: {
            line: {
              borderWidth: 2,
              borderColor: '#FF9999', // Cor vermelha mais clara
            },
            point: {
              radius: 0, // Sem pontos visíveis
              hoverRadius: 6, // Tamanho do ponto ao passar o cursor
              hoverBorderWidth: 2, // Largura da borda ao passar o cursor
            },
          },
        }} />
      </div>
    </div>
  );
};

export default Home;
