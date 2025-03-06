import { useContext } from "react";
import logo from "../../assets/logo_colinas.svg";
import { BtnLeave, LinkHeader } from "../../styles/";
import "./header.css";
import { AuthContext } from "../../contexts/auth";

export default function Header() {
  const { signOutUser } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <img src={logo} alt="" width={90} />
        <LinkHeader>
          <a href="/home">Home</a>
          <a href="/cadastrar">Cadastrar</a>
        </LinkHeader>
        <BtnLeave onClick={signOutUser}>Sair</BtnLeave>
      </nav>
    </header>
  );
}
