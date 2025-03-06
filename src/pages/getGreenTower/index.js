import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";

export default function InfoGreenTower() {
  const [lista, setLista] = useState([]);
  const { getTorre, listaEnergia } = useContext(AuthContext);
  const { idGreenTower } = useParams();

  const titulo = `Shopping ${idGreenTower}`;

  useEffect(() => {
    getTorre(idGreenTower);
  }, [idGreenTower, getTorre]);
  return (
    <>
      <Header />
      <Title name={titulo} />
      <div className="content">
        <table>
          <thead>
            <tr key="">
              <th>Loja</th>
              <th>Local</th>
              <th>Medição</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {listaEnergia && listaEnergia.length > 0 ? (
              listaEnergia.map((loja) => (
                <tr key={loja.id}>
                  <td>{loja.loja}</td>
                  <td>{loja.piso}</td>
                  <td>{loja.medicao}</td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhuma loja encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
