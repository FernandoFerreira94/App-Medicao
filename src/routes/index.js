import { Route, Routes } from "react-router-dom";

// Importação das páginas principais
import Page404 from "../pages/page404";
import Home from "../pages/home";
import SingIn from "../pages/signIn";
import Shop from "../pages/shop";
import GreenTower from "../pages/greenTower";
import Cadastrar from "../pages/cadastrar";
import InfoShop from "../pages/getShop";

// Componente para rotas protegidas
import Private from "./Private";

/**
 * Componente principal de Rotas da aplicação.
 * Define as rotas públicas, protegidas e de erro 404.
 */
export default function RoutesApp() {
  return (
    <Routes>
      {/* Rota pública: Tela de login */}
      <Route path="/" element={<SingIn />} />

      {/* Rotas protegidas: acessíveis apenas após autenticação */}
      <Route
        path="/home"
        element={
          <Private>
            <Home />
          </Private>
        }
      />

      <Route
        path="/shop"
        element={
          <Private>
            <Shop />
          </Private>
        }
      />

      <Route
        path="/greentower"
        element={
          <Private>
            <GreenTower />
          </Private>
        }
      />

      {/* Rotas dinâmicas: acessíveis para lojas específicas */}
      <Route
        path="/shop/:idShop"
        element={
          <Private>
            <InfoShop />
          </Private>
        }
      />

      <Route
        path="/greentower/:idShop"
        element={
          <Private>
            <InfoShop />
          </Private>
        }
      />

      {/* Rota protegida: Cadastro de loja */}
      <Route
        path="/cadastrar"
        element={
          <Private>
            <Cadastrar />
          </Private>
        }
      />

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
