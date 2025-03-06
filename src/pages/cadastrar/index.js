import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { setDoc, doc } from "firebase/firestore";

import Header from "../../components/Header";
import Title from "../../components/Title";

import { db } from "../../services/firebaseConection";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/auth";

export default function Cadastrar() {
  const { register, handleSubmit, reset } = useForm();

  const { setRegister } = useContext(AuthContext);

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
            Local:{" "}
            <select {...register("complexo")}>
              {" "}
              <option value="shopping" key="shop">
                Shopping
              </option>
              <option value="green-tower" key="greenTower">
                Green Tower
              </option>
            </select>
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
          </label>

          <label>
            Nome loja:{" "}
            <input
              type="text"
              placeholder="Digite nome da loja"
              {...register("loja")}
            />
          </label>
          <label>
            Local:{" "}
            <input
              type="text"
              placeholder="Digite nome da loja"
              {...register("piso")}
            />
          </label>
          <label>
            Ultima medição:
            <input
              type="text"
              placeholder="Digite nome da loja"
              {...register("medicao")}
            />
          </label>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    </>
  );
}
