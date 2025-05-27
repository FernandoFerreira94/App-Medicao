import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

// Importação de componentes e contexto
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import Modal from "../../components/modal";

/**
 * Componente principal que exibe informações das lojas e interage com o contexto
 * para recuperar os dados. Permite abrir modais para visualizar ou editar detalhes.
 */
export default function InfoShop() {
  // Estados para controle do modal e do ID da loja selecionada
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [buscaId, setBuscaId] = useState("");
  const [buscaLista, setBuscaLista] = useState("");
  const [listaFiltrada, setListaFiltrada] = useState([]);

  // Recupera parâmetros da URL e dados do contexto
  const { idShop } = useParams(); // ID do shopping
  const location = useLocation(); // Localização atual
  const { getShop, listaEnergia } = useContext(AuthContext); // Funções e dados do contexto

  // Define o título e o tipo de URL com base no caminho
  const titulo = ` ${idShop}`;
  const path = location.pathname;
  const compUrl = path.includes("/greentower") ? "green-tower" : "shopping";

  /**
   * Hook de efeito para buscar os dados do shopping quando o ID ou tipo de URL mudarem.
   */
  useEffect(() => {
    getShop(idShop, compUrl); // Chama função para buscar os dados do shopping
  }, [idShop, getShop, compUrl]);

  // Atualiza a lista filtrada sempre que a busca ou a lista original mudar
  useEffect(() => {
    if (buscaLista.trim() === "") {
      setListaFiltrada(listaEnergia);
    } else {
      setListaFiltrada(
        listaEnergia.filter(
          (loja) =>
            loja.nomeLoja.toLowerCase().includes(buscaLista.toLowerCase()) ||
            loja.id.toLowerCase().includes(buscaLista.toLowerCase()) ||
            loja.relogio.includes(buscaLista)
        )
      );
    }
  }, [buscaLista, listaEnergia]);
  /**
   * Abre o modal de detalhes da loja específica.
   * @param {string} id - ID da loja.
   */
  function handleShowModal(id) {
    setBuscaId(id); // Define o ID da loja a ser exibida no modal
    setShowModal(true); // Exibe o modal
  }

  /**
   * Abre o modal de edição para uma loja específica.
   * @param {string} id - ID da loja.
   */
  function handleShowModalEdit(id) {
    setBuscaId(id); // Define o ID da loja a ser editada no modal
    setShowModal(true); // Exibe o modal
    setShowModalEdit(true); // Define que o modal será de edição
  }

  // Renderização do componente
  return (
    <>
      <Header />
      {!showModal && (
        <>
          <Title name={titulo} />
          {/* Div de busca */}
          <div className="content">
            <div className="serch-content">
              <label>Buscar loja:</label>
              <input
                type="text"
                placeholder="Nome, ID ou N relogio..."
                value={buscaLista}
                onChange={(e) => setBuscaLista(e.target.value)} // Atualiza o valor do input
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th scope="col">Loja</th>
                  <th scope="col">ID</th>
                  <th scope="col">Local relogio</th>
                  <th scope="col">N relogio</th>
                  <th scope="col">Medição</th>
                  <th scope="col">Data ult atualização</th>
                  <th scope="col">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {listaFiltrada && listaFiltrada.length > 0 ? (
                  listaFiltrada.map((loja) => (
                    <>
                      <tr key={loja.id}>
                        <td data-label="Loja">{loja.nomeLoja}</td>
                        <td data-label="ID">{loja.id}</td>
                        <td data-label="Local Relogio">{loja.localRelogio}</td>
                        <td data-label="Medição">{loja.relogio}</td>
                        <td data-label="Medição">{loja.medicao}</td>
                        <td data-label="Data ult atualização">{loja.data}</td>
                        <td data-label="Detalhes">
                          <FaInfoCircle
                            onClick={() => handleShowModal(loja.id)}
                            color="rgb(78, 46, 145)"
                          />
                          <FaEdit
                            onClick={() => handleShowModalEdit(loja.id)}
                            color="rgb(239, 48, 109)"
                          />
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Nenhuma loja encontrada</td>
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
          modalEdit={showModalEdit}
        />
      )}
    </>
  );
}
