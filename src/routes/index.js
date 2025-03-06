import { Route, Routes } from "react-router-dom";

import Page404 from "../pages/page404";

import Private from "./Private";

import Home from "../pages/home";
import SingIn from "../pages/signIn";
import Shop from "../pages/shop";
import GreenTower from "../pages/greenTower";
import Cadastrar from "../pages/cadastrar";
import InfoShop from "../pages/getShop";
import InfoGreenTower from "../pages/getGreenTower";
export default function RoutesApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SingIn />} />
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

        <Route
          path="/shop/:idShop"
          element={
            <Private>
              <InfoShop />
            </Private>
          }
        />
        <Route
          path="/greentower/:idGreenTower"
          element={
            <Private>
              <InfoGreenTower />
            </Private>
          }
        />

        <Route
          path="/cadastrar"
          element={
            <Private>
              <Cadastrar />
            </Private>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}
