import React, { useState, useContext } from "react";

// Importação de estilos e componentes necessários
import { SignIn } from "../../styles";
import logo from "../../assets/logo_colinas.svg";
import "./signIn.css";
import { AuthContext } from "../../contexts/auth";

/**
 * Componente SingIn
 * Responsável pela autenticação do usuário, apresentando um formulário para entrada de email e senha.
 */
export default function SingIn() {
  // Estados para armazenar email e senha
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função e estado de contexto para autenticação
  const { signIn, loading } = useContext(AuthContext);

  /**
   * Manipula o envio do formulário de login.
   * Chama a função de autenticação do contexto.
   * @param {object} e - Evento de submissão do formulário.
   */
  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password); // Chama a função de login
  }

  return (
    <SignIn>
      <div className="signIn-div">
        {/* Exibe o logo */}
        <img src={logo} alt="Logo Colinas" width={180} />

        {/* Formulário de autenticação */}
        <form className="signIn-form" onSubmit={handleSubmit}>
          {/* Campo de email */}
          <label>
            Email:
            <input
              type="text"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            />
          </label>

          {/* Campo de senha */}
          <label>
            Senha:
            <input
              type="password"
              placeholder="admin@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
            />
          </label>

          {/* Botão de submissão */}
          <input
            type="submit"
            value={loading ? "Carregando..." : "Logar"} // Exibe estado de carregamento
          />
        </form>
      </div>
    </SignIn>
  );
}
