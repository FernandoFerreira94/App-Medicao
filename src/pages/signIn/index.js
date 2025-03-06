import React, { useState, useContext } from "react";

import { SignIn } from "../../styles";
import logo from "../../assets/logo_colinas.svg";
import "./signIn.css";
import { AuthContext } from "../../contexts/auth";

export default function SingIn() {
  const { signIn, loading, setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <SignIn>
      <div className="signIn-div">
        <img src={logo} alt="" width={180} />
        <form className="signIn-form" onSubmit={handleSubmit}>
          <label>
            Email:{" "}
            <input
              type="text"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Senha:{" "}
            <input
              type="password"
              placeholder="admin@123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <input type="submit" value={loading ? "Carregando..." : "Logar"} />
        </form>
      </div>
    </SignIn>
  );
}
