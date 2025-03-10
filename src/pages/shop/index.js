import React from "react";
import { useNavigate } from "react-router-dom";

// Estilos globais e componentes reutilizáveis
import { Content } from "../../styles";
import Header from "../../components/Header";
import Title from "../../components/Title";

import "./shop.css";

/**
 * Componente Shop
 * Exibe as opções de Energia e Água e permite a navegação dinâmica.
 */
export default function Shop() {
  const navigate = useNavigate();

  /**
   * Manipula a navegação para a rota específica com base no atributo `data-path`.
   * @param {object} e - Evento de clique no elemento.
   */
  function handleLink(e) {
    const path = e.currentTarget.getAttribute("data-path"); // Obtém o valor do atributo
    navigate(`/shop/${path}`); // Navega para a rota correspondente
  }

  return (
    <>
      {/* Cabeçalho e título da página */}
      <Header />
      <Title name="Shopping" />

      {/* Conteúdo principal */}
      <Content>
        {/* Card para Energia */}
        <div className="divLocal">
          <div
            className="energia"
            data-path="energia"
            onClick={handleLink} // Função reutilizável
          />
          <h2>Energia</h2>
        </div>

        {/* Card para Água */}
        <div className="divLocal">
          <div
            className="agua"
            data-path="agua"
            onClick={handleLink} // Função reutilizável
          />
          <h2>Água</h2>
        </div>
      </Content>
    </>
  );
}
