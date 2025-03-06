import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function Private({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando...</div>; // Mostrar uma mensagem de carregamento
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
