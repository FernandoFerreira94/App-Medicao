import React, { useContext, useEffect, useState } from "react";
import { updateDoc, doc } from "firebase/firestore";

import "./modal.css";
import { db } from "../../services/firebaseConection";
import { FaRegWindowClose } from "react-icons/fa";
import { AuthContext } from "../../contexts/auth";
import { toast } from "react-toastify";

export default function Modal({ close, idShop, buscaId, modalEdit }) {
  const { listaEnergia, loading, setLoading } = useContext(AuthContext);
  const [infoLoja, setInfoLoja] = useState(null);
  const [medicaoAtual, setMedicaoAtual] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    async function info() {
      console.log("Tipo de listaEnergia:", typeof listaEnergia); // Verifica o tipo
      console.log("Valor de listaEnergia:", listaEnergia); // Exibe o conteúdo

      if (Array.isArray(listaEnergia)) {
        const lojaEncontrada = listaEnergia.find(
          (loja) => loja.numeroLoja === buscaId
        );
        setInfoLoja(lojaEncontrada || null); // Atualiza o estado
      } else {
        console.error("listaEnergia não é um array!");
      }
    }

    info();
  }, [idShop, buscaId, listaEnergia]); // Adiciona listaEnergia como dependência

  // atualizar medição
  async function atualizarInfo(idURL, buscaId) {
    setLoading(true);
    const idShopping = `shopping-${idURL}`;
    const docRef = doc(db, idShopping, buscaId);

    await updateDoc(docRef, {
      ultimaMedicao: infoLoja.medicao,
      medicao: medicaoAtual,
    })
      .then(() => {
        setInfoLoja((prevState) => ({
          ...prevState,
          ultimaMedicao: prevState.medicao, // Move "medicao" para "ultimaMedicao"
          medicao: medicaoAtual, // Define a nova "medicao"
        }));
        toast.success("Medição atualizada com sucesso!");
      })
      .catch((e) => {
        toast.error("Erro ao atualizar a medição." + e);
      });
    setLoading(false);
  }

  //
  function atualziar(e) {
    const valorAtual = e.target.value;
    setMedicaoAtual(valorAtual);

    if (infoLoja && Number(valorAtual > Number(infoLoja.ultimaMedicao))) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  async function handleAtualizar(e) {
    e.preventDefault();

    if (!isFormValid) {
      toast.info("A medição atual deve ser maior que a ultima medição");
      return;
    }
    await atualizarInfo(idShop, buscaId);
    close();
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
                <strong> Complexo: </strong> <i> {infoLoja.complexo} </i>
              </label>
              <label>
                <strong> Medidor: </strong> <i> {infoLoja.tipo} </i>
              </label>
              <label>
                <strong>Nome: </strong> <i> {infoLoja.nomeLoja} </i>
              </label>
              <label>
                <strong> Eud: </strong> <i> {infoLoja.numeroLoja} </i>
              </label>
              <label>
                <strong>Relogio: </strong> <i> {infoLoja.localRelogio} </i>
              </label>
              <label>
                <strong>N relogio: </strong> <i> {infoLoja.relogio} </i>
              </label>
              <label>
                <strong>Medição: </strong> <i> {infoLoja.medicao} </i>
              </label>
              <label>
                <strong>Ultima medição: </strong>{" "}
                <i> {infoLoja.ultimaMedicao} </i>
              </label>
              <label>
                <strong>Data: </strong> <i> {infoLoja.data} </i>
              </label>
            </>
          ) : (
            <label>Carregando informações da loja...</label>
          )}
        </>
      ) : (
        <>
          {infoLoja ? (
            <form className="form-Edit" onSubmit={handleAtualizar}>
              <label>
                <strong>Complexo: </strong>{" "}
                <input type="text" value={infoLoja.complexo} disabled />
              </label>

              <label>
                <strong>Medidor: </strong>{" "}
                <input type="text" value={infoLoja.tipo} disabled />
              </label>

              <label>
                <strong>Nome: </strong>{" "}
                <input type="text" value={infoLoja.nomeLoja} disabled />
              </label>

              <label>
                <strong>Piso: </strong>{" "}
                <input type="text" value={infoLoja.numeroLoja} disabled />
              </label>

              <label>
                <strong>Local do Relogio: </strong>{" "}
                <input type="text" value={infoLoja.localRelogio} disabled />
              </label>

              <label>
                <strong>N Relogio: </strong>{" "}
                <input type="text" value={infoLoja.relogio} disabled />
              </label>

              <label>
                <strong>Medição atual: </strong>{" "}
                <input
                  type="text"
                  value={medicaoAtual}
                  placeholder="Digite a medição atual"
                  onChange={(e) => atualziar(e)}
                />
              </label>

              <label>
                <strong>Medição anterior: </strong>{" "}
                <input type="text" value={infoLoja.ultimaMedicao} disabled />
              </label>
              <input
                type="submit"
                value={loading ? "Atualizando" : "Atualziar"}
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
