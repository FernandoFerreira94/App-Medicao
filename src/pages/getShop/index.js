import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import Modal from "../../components/modal";

export default function InfoShop() {
  const [showModal, setShowModal] = useState(false);

  const { idShop } = useParams();
  const { getShop, listaEnergia } = useContext(AuthContext);

  const titulo = `Shopping ${idShop}`;
  useEffect(() => {
    getShop(idShop);
  }, [idShop, getShop]);

  function handleShowModal() {
    setShowModal(true);
  }

  return (
    <>
      <Header />
      {!showModal && (
        <>
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
                      <td>
                        <FaInfoCircle onClick={() => handleShowModal()} />
                        <FaEdit />
                      </td>
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
      )}
      {showModal && <Modal close={() => setShowModal(false)} />}
    </>
  );
}
