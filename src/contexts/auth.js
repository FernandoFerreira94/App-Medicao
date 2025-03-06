import { useState, createContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";

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

  async function signOutUser() {
    await signOut(auth);
    localStorage.removeItem("@admin");
    setUser(null);
    navigate("/");
  }

  async function setRegister(data) {
    const uniqueId = `${data.complexo}-${data.tipo}`;
    const id = data.piso;
    await setDoc(doc(db, uniqueId, id), {
      complexo: data.complexo,
      tipo: data.tipo,
      loja: data.loja,
      piso: data.piso,
      medicao: data.medicao,
      ultimaMedicao: data.medicao,
      data: formatoDate,
    })
      .then(() => {
        toast.success("Loja cadastrado com sucesso");
      })
      .catch((e) => {
        toast.error("Ops erro ao cadastrar");
        console.log(e);
      });
  }

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
