import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

import logo from "../../assets/logo_colinas.svg";
import { BtnLeave, LinkHeader } from "../../styles/";

export default function Header() {
  const { signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <img src={logo} alt="" width={90} onClick={() => navigate("/home")} />
        <LinkHeader>
          <a href="/home">Home</a>
          <a href="/cadastrar">Cadastrar</a>
        </LinkHeader>
        <BtnLeave onClick={signOutUser}>Sair</BtnLeave>
      </nav>
    </header>
  );
}
