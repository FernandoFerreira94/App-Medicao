import React, { useContext, useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

import "./modal.css";
import { db } from "../../services/firebaseConection";
import { FaRegWindowClose } from "react-icons/fa";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function Modal({ close, idShop, buscaId, modalEdit }) {
  // Contexto e estados iniciais
  const { listaEnergia, loading, setLoading } = useContext(AuthContext);

  // Armazena as informações da loja, a medição atual e a validação do formulário
  const [infoLoja, setInfoLoja] = useState(null);
  const [medicaoAtual, setMedicaoAtual] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [novaFoto, setNovaFoto] = useState(null); // Estado para a nova foto

  const location = useLocation();
  const path = location.pathname;

  // Define o tipo de URL (complexo ou shopping)
  const compUrl = path.includes("/greentower") ? "green-tower" : "shopping";

  // Busca os dados da loja a partir do contexto
  useEffect(() => {
    async function fetchInfoLoja() {
      if (Array.isArray(listaEnergia)) {
        const lojaEncontrada = listaEnergia.find((loja) => loja.id === buscaId);
        setInfoLoja(lojaEncontrada || null);
      } else {
        console.error("listaEnergia não é um array!");
      }
    }

    fetchInfoLoja();
  }, [idShop, buscaId, listaEnergia]);

  /**
   * Atualiza os dados da loja no Firestore.
   * Valida os parâmetros antes de realizar a atualização.
   */
  async function atualizarInfo(idURL, buscaId, campUrl) {
    setLoading(true);
    const idShopping = `${campUrl}-${idURL}`;

    // Validação dos parâmetros
    if (!idShopping || !buscaId) {
      toast.error("Parâmetros inválidos para a atualização do documento!");
      setLoading(false);
      return;
    }

    if (!infoLoja || typeof infoLoja.medicao === "undefined" || !medicaoAtual) {
      toast.error("Dados incompletos para a atualização!");
      setLoading(false);
      return;
    }

    // Atualiza o documento no Firestore
    try {
      const docRef = doc(db, idShopping, buscaId);
      await updateDoc(docRef, {
        ultimaMedicao: infoLoja.medicao,
        medicao: medicaoAtual,
        photo: novaFoto,
      });

      // Atualiza os dados localmente
      setInfoLoja((prevState) => ({
        ...prevState,
        ultimaMedicao: prevState.medicao,
        medicao: medicaoAtual,
      }));

      setMedicaoAtual(""); // Limpa o campo
      toast.success("Medição atualizada com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar medição: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Lida com as mudanças no campo de medição atual.
   * Atualiza a medição e valida o formulário.
   */
  function handleChangeMediacao(e) {
    const valorAtual = e.target.value;
    setMedicaoAtual(valorAtual);

    if (infoLoja && Number(valorAtual) > Number(infoLoja.ultimaMedicao)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  /**
   * Manipula o envio do formulário para atualizar os dados.
   * Valida a entrada antes de chamar a atualização.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid) {
      toast.info("A medição atual deve ser maior que a última medição");
      return;
    }

    await atualizarInfo(idShop, buscaId, compUrl);
    close();
  }

  function handleChangeFoto(e) {
    const file = e.target.files[0];
    setNovaFoto(file); // Salva a foto no estado
  }

  return (
    <div className="modal cadastrar">
      <FaRegWindowClose className="close" onClick={() => close()} />
      <h2>{!modalEdit ? "Detalhes" : "Editar"}</h2>

      {!modalEdit ? (
        <>
          {infoLoja ? (
            <>
              <label>
                <strong>Complexo:</strong> <i>{infoLoja.complexo}</i>
              </label>
              <label>
                <strong>Medidor:</strong> <i>{infoLoja.tipo}</i>
              </label>
              <label>
                <strong>Nome:</strong> <i>{infoLoja.nomeLoja}</i>
              </label>
              <label>
                <strong>ID:</strong> <i>{infoLoja.id}</i>
              </label>
              <label>
                <strong>Local do Relógio:</strong>{" "}
                <i>{infoLoja.localRelogio}</i>
              </label>
              {infoLoja.descricao && (
                <>
                  <label>
                    <strong>Local: </strong>
                    <i>{infoLoja.descricao}</i>
                  </label>
                </>
              )}
              <label>
                <strong>Número do Relógio:</strong> <i>{infoLoja.relogio}</i>
              </label>
              <label>
                <strong>Medição Atual:</strong> <i>{infoLoja.medicao}</i>
              </label>
              <label>
                <strong>Última Medição:</strong> <i>{infoLoja.ultimaMedicao}</i>
              </label>
              <label>
                <strong>Foto:</strong>{" "}
              </label>
              <img
                className="photo-Modal"
                src={infoLoja.photo}
                alt="Foto do relogio"
              />
              <a
                href={infoLoja.photo}
                download={`Foto-relogio-${infoLoja.id || "Default"}`}
                className="download-link"
              >
                Baixar Foto
              </a>
              <label>
                <strong>Data:</strong> <i>{infoLoja.data}</i>
              </label>
            </>
          ) : (
            <label>Carregando informações da loja...</label>
          )}
        </>
      ) : (
        <>
          {infoLoja ? (
            <form className="form-Edit" onSubmit={handleSubmit}>
              <label>
                <strong>Complexo:</strong>{" "}
                <input type="text" value={infoLoja.complexo} disabled />
              </label>

              <label>
                <strong>Medidor:</strong>{" "}
                <input type="text" value={infoLoja.tipo} disabled />
              </label>

              <label>
                <strong>Nome:</strong>{" "}
                <input type="text" value={infoLoja.nomeLoja} disabled />
              </label>

              <label>
                <strong>Ued:</strong>{" "}
                <input type="text" value={infoLoja.id} disabled />
              </label>

              <label>
                <strong>Local do Relógio:</strong>{" "}
                <input type="text" value={infoLoja.localRelogio} disabled />
              </label>

              <label>
                <strong>Número do Relógio:</strong>{" "}
                <input type="text" value={infoLoja.relogio} disabled />
              </label>

              <label>
                <strong>Medição Atual:</strong>{" "}
                <input
                  type="text"
                  value={medicaoAtual}
                  placeholder="Digite a medição atual"
                  onChange={handleChangeMediacao}
                />
              </label>

              <label>
                <strong>Última Medição:</strong>{" "}
                <input type="text" value={infoLoja.ultimaMedicao} disabled />
              </label>

              <label>
                Foto:
                <input
                  type="file"
                  accept="image/*" // Aceita apenas arquivos de imagem
                  capture="environment" // Abre a câmera automaticamente no celular (se suportado)
                  onChange={handleChangeFoto}
                />
              </label>
              <input
                type="submit"
                value={loading ? "Atualizando..." : "Atualizar"}
                disabled={loading}
              />
            </form>
          ) : (
            <label>Carregando informações da loja para edição...</label>
          )}
        </>
      )}
    </div>
  );
}
