import styled from "styled-components";

/**
 * Estiliza o contêiner de links no cabeçalho.
 */
export const LinkHeader = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 20px;
  font-size: 17px;
  margin-right: 15%;

  @media screen and (max-width: 700px) {
    gap: 10px;
  }
`;

/**
 * Estiliza o botão para sair, com hover interativo.
 */
export const BtnLeave = styled.button`
  height: 100%;
  width: 60px;

  &:hover {
    background-color: rgb(56, 34, 104); /* Efeito de hover */
  }
`;

/**
 * Estiliza a página de login (SignIn).
 */
export const SignIn = styled.div`
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(78, 46, 145); /* Cor de fundo da página */
`;

/**
 * Estiliza o conteúdo principal da página.
 */
export const Content = styled.main`
  width: 70%;
  margin: 0 auto; /* Centraliza o conteúdo */

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px; /* Espaçamento interno para melhor organização */

  @media screen and (max-width: 1050px) {
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;
