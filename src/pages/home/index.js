import React from "react";
import { useNavigate } from "react-router-dom";

// Componentes reutilizáveis
import Header from "../../components/Header";
import Title from "../../components/Title";

// Estilos globais
import { Content } from "../../styles";
import "./home.css";

/**
 * Componente Home
 * Exibe os diferentes complexos disponíveis e permite a navegação dinâmica.
 */
export default function Home() {
  const navigate = useNavigate();

  /**
   * Função para manipular a navegação com base no atributo `data-path`.
   * @param {object} e - Evento de clique no elemento.
   */
  function handleLink(e) {
    const path = e.currentTarget.getAttribute("data-path"); // Obtém o caminho do atributo
    navigate(`/${path}`); // Navega para a rota correspondente
  }

  return (
    <>
      {/* Cabeçalho e título da página */}
      <Header />
      <Title name="Complexo" />

      {/* Conteúdo principal */}
      <Content>
        {/* Card para Shopping */}
        <div className="divLocal">
          <div
            className="shop"
            data-path="shop"
            onClick={handleLink} // Função reutilizável
          />
          <h2>Shopping Colinas</h2>
        </div>

        {/* Card para Green Tower */}
        <div className="divLocal">
          <div
            className="torre"
            data-path="greentower"
            onClick={handleLink} // Função reutilizável
          />
          <h2>Green Tower</h2>
        </div>
      </Content>
    </>
  );
}
