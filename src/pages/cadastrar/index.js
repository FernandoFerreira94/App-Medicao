import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import "./cadastrar.css";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { AuthContext } from "../../contexts/auth";

export default function Cadastrar() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { setRegister, loading } = useContext(AuthContext);
  const [show, setShow] = useState("shopping");
  const msgError = "Campo obrigatorio";

  async function handleRegister(data) {
    await setRegister(data);
    reset();
  }
  return (
    <>
      <Header />
      <Title name="Cadastrar Loja" />
      <div className="content cadastrar">
        <form onSubmit={handleSubmit(handleRegister)}>
          <label>
            Complexo:{" "}
            <select
              {...register("complexo")}
              onChange={(e) => setShow(e.target.value)}
            >
              {" "}
              <option value="shopping" key="shop">
                Shopping
              </option>
              <option value="green-tower" key="greenTower">
                Green Tower
              </option>
            </select>
            {errors.complexo && (
              <small className="error">{errors.complexo.message}</small>
            )}
          </label>

          <label>
            Tipo:{" "}
            <select {...register("tipo")}>
              {" "}
              <option value="energia" key="energia">
                Energia
              </option>
              <option value="agua" key="agua">
                Agua
              </option>
            </select>
            {errors.tipo && (
              <small className="error">{errors.tipo.message}</small>
            )}
          </label>

          {show === "shopping" ? (
            <>
              <label>
                Nome loja:{" "}
                <input
                  type="text"
                  placeholder="Digite nome da loja"
                  {...register("nomeLoja", { required: "Campos Obrigatorio" })}
                />
                {errors.nomeLoja && (
                  <small className="error">{errors.nomeLoja.message}</small>
                )}
              </label>

              <label>
                Piso:{" "}
                <select
                  {...register("piso", { required: "Campos Obrigatorio" })}
                >
                  {" "}
                  <option value="NS" key="NS">
                    NS
                  </option>
                  <option value="NT" key="NT">
                    NT
                  </option>
                  <option value="QS" key="QS">
                    QS
                  </option>
                  <option value="QT" key="QT">
                    QT
                  </option>
                </select>
                {errors.piso && (
                  <small className="error">{errors.piso.message}</small>
                )}
              </label>

              <label>
                Numero:{" "}
                <input
                  type="text"
                  placeholder="Digite numero da loja"
                  {...register("numero", { required: "Campos Obrigatorio" })}
                />
                {errors.numero && (
                  <small className="error">{errors.numero.message}</small>
                )}
              </label>
              <label>
                Local Relogio:
                <select
                  {...register("localRelogio", {
                    required: "Campo Obrigatorio",
                  })}
                >
                  <option value="sub-adm" key="sub-adm">
                    Sub-Adm
                  </option>
                  <option value="CM-1" key="CM-1">
                    CM-1
                  </option>
                  <option value="CM-2" key="CM-2">
                    CM-2
                  </option>
                  <option value="shaft-" key="shaft">
                    Shaft
                  </option>
                  <option value="outro-" key="outro">
                    outro
                  </option>
                  {errors.localRelogio && (
                    <small className="error">
                      {errors.localRelogio.message}
                    </small>
                  )}
                </select>
              </label>
            </>
          ) : (
            <>
              <label>
                Nome da sala:{" "}
                <input
                  type="text"
                  placeholder="Digite nome da sala comercial"
                  {...register("nomeLoja", { required: "Campos Obrigatorio" })}
                />
                {errors.nomeLoja && (
                  <small className="error">{errors.nomeLoja.message}</small>
                )}
              </label>

              <label>
                Andar:{" "}
                <input
                  type="text"
                  placeholder="Digite o andar"
                  {...register("andar", { required: "Campo obrigatorio" })}
                />
                {errors.andar && (
                  <small className="error">{errors.andar.message}</small>
                )}
              </label>

              <label>
                Numero:{" "}
                <input
                  type="text"
                  placeholder="Digite numero da sala comercial"
                  {...register("numero", { required: "Campos Obrigatorio" })}
                />
                {errors.numero && (
                  <small className="error">{errors.numero.message}</small>
                )}
              </label>

              <label>
                Andar relogio:
                <input
                  type="text"
                  placeholder="Digite o andar do relogio"
                  {...register("andarRelogio", {
                    required: "Campos Obrigatorio",
                  })}
                />
                {errors.andarRelogio && (
                  <small className="error">{errors.andarRelogio.message}</small>
                )}
              </label>
            </>
          )}

          <label>
            N Relogio:
            <input
              type="text"
              placeholder="Digite numero do relogio"
              {...register("relogio", { required: "Campos Obrigatorio" })}
            />
            {errors.relogio && (
              <small className="error">{errors.relogio.message}</small>
            )}
          </label>

          <label>
            Ultima medição:
            <input
              type="number"
              placeholder="Digite nome da loja"
              {...register("medicao", { required: "Campos Obrigatorio" })}
            />
            {errors.medicao && (
              <small className="error">{errors.medicao.message}</small>
            )}
          </label>
          <input type="submit" value={loading ? "Cadastrando" : "Cadastrar"} />
        </form>
      </div>
    </>
  );
}
