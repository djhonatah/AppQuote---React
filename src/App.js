import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// URL da API de citações aleatórias
const QUOTE_API_URL = 'https://api.quotable.io/random';

// Função principal da aplicação
function App() {
  // Define os estados para a citação e o status de carregamento
  const [quote, setQuote] = useState({ content: "", author: "" });
  const [loading, setLoading] = useState(true);

  // Hook useEffect para buscar uma nova citação quando o componente é montado
  useEffect(() => {
    getNewQuote();
  }, []);

  // Função assíncrona para buscar uma nova citação
  const getNewQuote = async () => {
    // Define loading como true para mostrar que a requisição está em progresso
    setLoading(true);
    try {
      // Faz uma requisição para a API de citações aleatórias
      const response = await axios.get(QUOTE_API_URL);
      // Atualiza o estado da citação com os dados da resposta
      setQuote({ content: response.data.content, author: response.data.author });
    } catch (error) {
      // Registra um erro no console caso ocorra um problema durante a requisição
      console.error("Erro ao buscar a citação", error);
    } finally {
      // Define loading como false após a requisição, independentemente do resultado
      setLoading(false);
    }
  };

  // Renderiza o componente
  return (
    <div className="App">
      <div id="quote-box" className="quote-box">
        {loading ? (
          // Se loading for true, exibe a mensagem "Carregando"
          <div>Carregando...</div>
        ) : (
          // Se loading for false, exibe todo o resto
          <>
            <div id="text" className="quote-text">"{quote.content}"</div>
            <div id="author" className="quote-author">- {quote.author}</div>
            <button id="new-quote" className="new-quote-button" onClick={getNewQuote}>Nova Citação</button>
            <a 
              id="tweet-quote" 
              className="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.content}" - ${quote.author}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweetar
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
