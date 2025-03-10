import React from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../../styles";

// Componentes reutilizáveis
import Header from "../../components/Header";
import Title from "../../components/Title";

/**
 * Componente GreenTower
 * Exibe opções para Energia e Água, permitindo navegação dinâmica.
 */
export default function GreenTower() {
  const navigate = useNavigate();

  /**
   * Manipula a navegação com base no atributo `data-path` do elemento clicado.
   * @param {object} e - Evento de clique.
   */
  function handleLink(e) {
    const path = e.currentTarget.getAttribute("data-path"); // Obtém o valor do atributo
    navigate(`/greentower/${path}`); // Navega para a rota correspondente
  }

  return (
    <>
      {/* Cabeçalho e título da página */}
      <Header />
      <Title name="Green Tower" />

      {/* Conteúdo principal */}
      <Content>
        {/* Seção para Energia */}
        <div className="divLocal">
          <div
            className="energia"
            data-path="energia"
            onClick={handleLink} // Simplificado para evitar repetição
          />
          <h2>Energia</h2>
        </div>

        {/* Seção para Água */}
        <div className="divLocal">
          <div
            className="agua"
            data-path="agua"
            onClick={handleLink} // Reutilização da mesma função
          />
          <h2>Água</h2>
        </div>
      </Content>
    </>
  );
}
