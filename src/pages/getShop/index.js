import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import Modal from "../../components/modal";

export default function InfoShop() {
  const [showModal, setShowModal] = useState(false);
  const [shwoModalEdit, setShowModalEdit] = useState(false);
  const [buscaId, setBuscaId] = useState("");

  const { idShop } = useParams();
  const { getShop, listaEnergia } = useContext(AuthContext);

  const titulo = `Shopping ${idShop}`;
  useEffect(() => {
    getShop(idShop);
  }, [idShop, getShop]);

  function handleShowModal(numeroLoja) {
    setBuscaId(numeroLoja);
    setShowModal(true);
  }

  function handleShowModalEdit(numeroLoja) {
    setBuscaId(numeroLoja);
    setShowModal(true);
    setShowModalEdit(true);
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
                  <th>Eud</th>
                  <th>Medição</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {listaEnergia && listaEnergia.length > 0 ? (
                  listaEnergia.map((loja) => (
                    <tr key={loja.id}>
                      <td>{loja.nomeLoja}</td>
                      <td>{loja.numeroLoja}</td>
                      <td>{loja.medicao}</td>
                      <td>
                        <FaInfoCircle
                          onClick={() => handleShowModal(loja.numeroLoja)}
                          color=" rgb(78, 46, 145)"
                        />
                        <FaEdit
                          onClick={() => handleShowModalEdit(loja.numeroLoja)}
                          color="rgb(239, 48, 109)"
                        />
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
      {showModal && (
        <Modal
          buscaId={buscaId}
          idShop={idShop}
          close={() => {
            setShowModal(false);
            setShowModalEdit(false);
          }}
          modalEdit={shwoModalEdit}
        />
      )}
    </>
  );
}
