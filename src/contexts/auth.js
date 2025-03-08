import { useState, createContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

import { db, auth } from "../services/firebaseConection.js";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [listaEnergia, setListaEnergia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dateNow = new Date();
  const formatoDate = dateNow.toLocaleDateString();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@admin");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  // função de login
  async function signIn(email, password) {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
          });
        }

        const userData = {
          uid: user.uid,
          email: user.email,
        };

        setUser(userData);
        localStorage.setItem("@admin", JSON.stringify(userData));

        toast.success("Seja bem-vindo");
        setLoading(false);
        navigate("/home");
      })
      .catch((e) => {
        setLoading(false);
        toast.error("Email e senha incorretos");
        console.log(e);
      });
  }

  // Função deslogar
  async function signOutUser() {
    await signOut(auth);
    localStorage.removeItem("@admin");
    setUser(null);
    navigate("/");
  }

  // função de registrar loja
  async function setRegister(data) {
    // Validação dos campos obrigatórios
    if (
      !data.complexo ||
      !data.tipo ||
      !data.numero ||
      (!data.piso && !data.andar) || // Garantir que pelo menos um (piso ou andar) esteja presente
      !data.localRelogio ||
      !data.relogio ||
      !formatoDate
    ) {
      console.error("Erro: Campos obrigatórios ausentes!", data);
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const uniqueId = `${data.complexo}-${data.tipo}`;
    let id = "";
    if (data.complexo === "shopping") {
      id = `${data.piso}-${data.numero}`;
    } else {
      id = `${data.andar}-${data.numero}`;
    }

    if (!db) {
      console.error("A instância do Firestore (db) está indefinida!");
      return;
    }

    if (!uniqueId || !id) {
      console.error("Erro: uniqueId ou id estão indefinidos!", {
        uniqueId,
        id,
      });
      return;
    }

    try {
      await setDoc(doc(db, uniqueId, id), {
        complexo: data.complexo,
        tipo: data.tipo,
        nomeLoja: data.nomeLoja || "N/A",
        piso: data.piso || "N/A",
        numero: data.numero,
        numeroLoja: data.piso
          ? `${data.piso}-${data.numero}`
          : `${data.andar}-${data.numero}`,
        medicao: data.medicao || 0,
        ultimaMedicao: data.medicao || 0,
        localRelogio: data.localRelogio || "N/A",
        andar: data.andar || "N/A",
        andarRelogio: data.andarRelogio || "N/A",
        relogio: data.relogio,
        data: formatoDate,
      });
      toast.success("Loja cadastrada com sucesso!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (e) {
      console.error("Erro ao salvar no Firestore:", e);
      toast.error("Ops, erro ao cadastrar a loja.");
    }
  }

  // funcao Get medicao indivudual
  async function getInfo(idURL, buscaId) {
    const idShopping = `shopping-${idURL}`;
    const docRef = doc(db, idShopping, buscaId);

    await getDoc(docRef)
      .then((snapshot) => {
        const data = snapshot.data();
        setListaEnergia(data);
      })
      .catch((e) => console.log(e));
  }

  // Get das mediçoes do shopping
  async function getShop(idURL) {
    const idShopping = `shopping-${idURL}`;
    const docRef = collection(db, idShopping);

    await getDocs(docRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            complexo: doc.data().complexo,
            tipo: doc.data().tipo,
            nomeLoja: doc.data().nomeLoja,
            piso: doc.data().piso,
            numero: doc.data().numero,
            numeroLoja: doc.data().numeroLoja,
            medicao: doc.data().medicao,
            localRelogio: doc.data().localRelogio,
            andar: doc.data().andar,
            andarRelogio: doc.data().andarRelogio,
            relogio: doc.data().relogio,
            ultimaMedicao: doc.data().ultimaMedicao,
            data: doc.data().data,
          });
        });
        setListaEnergia(lista);
      })
      .catch((e) => console.log(e));
  }

  // Get das medicoes GreenTower
  async function getTorre(idURL) {
    const idShopping = `green-tower-${idURL}`;
    const docRef = collection(db, idShopping);

    await getDocs(docRef)
      .then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            complexo: doc.data().complexo,
            tipo: doc.data().tipo,
            loja: doc.data().loja,
            piso: doc.data().piso,
            medicao: doc.data().medicao,
            ultimaMedicao: doc.data().ultimaMedicao,
          });
        });
        setListaEnergia(lista);
      })
      .catch((e) => console.log(e));
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOutUser,
        user,
        loading,
        setLoading,
        setRegister,
        getShop,
        listaEnergia,
        getTorre,
        getInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
