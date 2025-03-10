import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
/* Reset básico de estilos */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    user-select: none; /* Evita seleção de texto por padrão */
}

/* Estilos gerais do corpo */
body {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    width: 100%;
}

/* Links */
a {
    text-decoration: none;
    color: rgb(113, 113, 113);
    position: relative;
}

a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -8px;
    left: 0;
    background-color: rgb(239, 48, 109);
    visibility: hidden;
    transition: all 0.4s ease; /* Suaviza a transição */
}

a:hover::after {
    visibility: visible;
    width: 100%; /* Preenche completamente o link ao passar o mouse */
}

/* Botões */
button {
    cursor: pointer;
    background-color: rgb(78, 46, 145);
    color: #fff;
    border: 1px solid transparent;
    transition: all 0.5s ease; /* Suaviza o efeito no hover ou foco */
}

/* Header (Cabeçalho) */
header {
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.29) 0px 10px 29px -1px; /* Sombra elegante */
}

/* Navegação dentro do Header */
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    margin-left: 200px;

    @media screen and (max-width:700px) {
        margin-left : 20px;

        img{
            width: 90px;
            margin-right: 20px;
        }
    }
}

nav img {
    cursor: pointer; /* Adiciona uma interação visual ao ícone */
}
`;
