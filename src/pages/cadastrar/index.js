import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import "./cadastrar.css";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { AuthContext } from "../../contexts/auth";

export default function Cadastrar() {
  // Hooks do React Hook Form para controle do formulário
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Contexto para integração com AuthContext
  const { setRegister, loading } = useContext(AuthContext);

  // Estado para alternar entre "shopping" e "green-tower"
  const [complexo, setComplexo] = useState("shopping");

  // Estado para mostrar descricao se for selecionado option value "outro"
  const [showDescricao, setShowDescricao] = useState(false);

  const MSG_ERROR = "Campo obrigatório"; // Mensagem padrão de erro

  /**
   * Manipula o envio do formulário.
   * Registra os dados no contexto e reseta o formulário após o envio.
   * @param {object} data - Dados enviados pelo formulário.
   */
  async function handleRegister(data) {
    await setRegister(data);
    reset(); // Reseta os campos do formulário após sucesso
  }

  return (
    <>
      {/* Cabeçalho e título da página */}
      <Header />
      <Title name="Cadastrar Loja" />

      <div className="content cadastrar">
        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Seletor de Complexo */}
          <label>
            Complexo:
            <select
              {...register("complexo", { required: MSG_ERROR })}
              onChange={(e) => setComplexo(e.target.value)}
            >
              <option value="shopping">Shopping</option>
              <option value="green-tower">Green Tower</option>
            </select>
            {errors.complexo && (
              <small className="error">{errors.complexo.message}</small>
            )}
          </label>

          {/* Seletor de Tipo */}
          <label>
            Tipo:
            <select {...register("tipo", { required: MSG_ERROR })}>
              <option value="energia">Energia</option>
              <option value="agua">Água</option>
            </select>
            {errors.tipo && (
              <small className="error">{errors.tipo.message}</small>
            )}
          </label>

          {/* Campos específicos para Shopping */}
          {complexo === "shopping" ? (
            <>
              <label>
                Nome Loja:
                <input
                  type="text"
                  placeholder="Digite o nome da loja"
                  {...register("nomeLoja", {
                    required: MSG_ERROR,
                    onChange: (e) => {
                      e.target.value = e.target.value.toUpperCase();
                    },
                  })}
                />
                {errors.nomeLoja && (
                  <small className="error">{errors.nomeLoja.message}</small>
                )}
              </label>

              <label>
                Piso:
                <select {...register("piso", { required: MSG_ERROR })}>
                  <option value="NS">NS</option>
                  <option value="NT">NT</option>
                  <option value="QS">QS</option>
                  <option value="QT">QT</option>
                </select>
                {errors.piso && (
                  <small className="error">{errors.piso.message}</small>
                )}
              </label>

              <label>
                Número:
                <input
                  type="text"
                  placeholder="Digite o número da loja"
                  {...register("numero", { required: MSG_ERROR })}
                />
                {errors.numero && (
                  <small className="error">{errors.numero.message}</small>
                )}
              </label>

              <label>
                Local Relógio:
                <select
                  {...register("localRelogio", { required: MSG_ERROR })}
                  onChange={(e) => {
                    setShowDescricao(e.target.value === "outro");
                  }}
                >
                  <option value="sub-adm">Sub-Adm</option>
                  <option value="CM-1">CM-1</option>
                  <option value="CM-2">CM-2</option>
                  <option value="shaft">Shaft</option>
                  <option value="outro">Outros</option>
                </select>
                {errors.localRelogio && (
                  <small className="error">{errors.localRelogio.message}</small>
                )}
              </label>
              {showDescricao && (
                <>
                  <label> Descrição:</label>
                  <textarea
                    placeholder="Digite a descrição do local do relogio"
                    {...register("descricao", { required: MSG_ERROR })}
                  />
                  {errors.descricao && (
                    <small className="error">{errors.descricao.message}</small>
                  )}
                </>
              )}
            </>
          ) : (
            // Campos específicos para Green Tower
            <>
              <label>
                Nome Sala:
                <input
                  type="text"
                  placeholder="Digite o nome da sala"
                  {...register("nomeLoja", { required: MSG_ERROR })}
                />
                {errors.nomeLoja && (
                  <small className="error">{errors.nomeLoja.message}</small>
                )}
              </label>

              <label>
                Andar:
                <input
                  type="text"
                  placeholder="Digite o andar"
                  {...register("andar", { required: MSG_ERROR })}
                />
                {errors.andar && (
                  <small className="error">{errors.andar.message}</small>
                )}
              </label>

              <label>
                Número:
                <input
                  type="text"
                  placeholder="Digite o número da sala"
                  {...register("numero", { required: MSG_ERROR })}
                />
                {errors.numero && (
                  <small className="error">{errors.numero.message}</small>
                )}
              </label>

              <label>
                Andar Relógio:
                <input
                  type="text"
                  placeholder="Digite o andar do relógio"
                  {...register("andarRelogio", { required: MSG_ERROR })}
                />
                {errors.andarRelogio && (
                  <small className="error">{errors.andarRelogio.message}</small>
                )}
              </label>
            </>
          )}

          {/* Campos Comuns */}
          <label>
            Número Relógio:
            <input
              type="text"
              placeholder="Digite o número do relógio"
              {...register("relogio", { required: MSG_ERROR })}
            />
            {errors.relogio && (
              <small className="error">{errors.relogio.message}</small>
            )}
          </label>

          <label>
            Última Medição:
            <input
              type="number"
              placeholder="Digite a última medição"
              {...register("medicao", { required: MSG_ERROR })}
            />
            {errors.medicao && (
              <small className="error">{errors.medicao.message}</small>
            )}
          </label>

          <label>
            Foto:
            <input
              type="file"
              accept="image/*" // Aceita apenas arquivos de imagem
              capture="environment" // Abre a câmera automaticamente no celular (se suportado)
              //  {...register("photo")}
            />
          </label>

          {/* Botão de Submissão */}
          <input
            type="submit"
            value={loading ? "Cadastrando..." : "Cadastrar"}
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
}
