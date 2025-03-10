import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db, auth } from "../services/firebaseConection.js";
import { toast } from "react-toastify";

// Criação do contexto de autenticação
export const AuthContext = createContext({});

/**
 * Provedor de Autenticação que gerencia estados globais do usuário,
 * funcionalidade de login, logout e integração com Firebase.
 */
function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Estados globais
  const [listaEnergia, setListaEnergia] = useState([]); // Dados das lojas
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const [user, setUser] = useState(null); // Dados do usuário logado

  const dateNow = new Date();
  const formatoDate = dateNow.toLocaleDateString();

  /**
   * Efeito para carregar o usuário armazenado localmente no início.
   */
  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@admin");

      if (storageUser) {
        setUser(JSON.parse(storageUser)); // Carrega o usuário salvo
      }
      setLoading(false); // Finaliza carregamento inicial
    }

    loadUser();
  }, []);

  /**
   * Função para realizar login.
   * Autentica o usuário no Firebase Authentication e salva seus dados localmente.
   * @param {string} email - Email do usuário.
   * @param {string} password - Senha do usuário.
   */
  async function signIn(email, password) {
    setLoading(true); // Inicia carregamento
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential; // Dados do usuário autenticado
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        // Se o usuário não existir no Firestore, cria um novo registro
        if (!docSnap.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
          });
        }

        const userData = {
          uid: user.uid,
          email: user.email,
        };

        setUser(userData); // Salva dados do usuário no estado
        localStorage.setItem("@admin", JSON.stringify(userData)); // Salva no localStorage

        toast.success("Seja bem-vindo");
        setLoading(false);
        navigate("/home"); // Redireciona para a página inicial
      })
      .catch((e) => {
        setLoading(false); // Finaliza carregamento
        toast.error("Email e senha incorretos");
        console.error(e);
      });
  }

  /**
   * Função para deslogar o usuário.
   * Remove os dados do usuário localmente e no Firebase Authentication.
   */
  async function signOutUser() {
    await signOut(auth); // Desloga do Firebase
    localStorage.removeItem("@admin"); // Remove dados salvos
    setUser(null); // Reseta o estado do usuário
    navigate("/"); // Redireciona para a página inicial
  }

  /**
   * Função para registrar uma loja no Firestore.
   * Verifica a validade dos dados e salva o documento na base de dados.
   * @param {object} data - Dados da loja a ser registrada.
   */

  async function setRegister(data) {
    // Validação dos campos obrigatórios

    const valid =
      !data.complexo ||
      !data.tipo ||
      !data.numero ||
      (!data.piso && !data.andar) || // Ao menos um dos dois deve ser preenchido
      !data.localRelogio ||
      !data.relogio ||
      !formatoDate;

    if (valid) {
      toast.error("Preencha todos os campos obrigatórios.");
      console.error("Erro: Campos obrigatórios ausentes!", data);
      return;
    }

    const uniqueId = `${data.complexo}-${data.tipo}`; // Identificador único por tipo e complexo
    const id =
      data.complexo === "shopping"
        ? `${data.piso}-${data.numero}` // Gera ID para shopping
        : `${data.andar}-${data.numero}`; // Gera ID para outros complexos

    try {
      await setDoc(doc(db, uniqueId, id), {
        id,
        complexo: data.complexo,
        tipo: data.tipo,
        nomeLoja: data.nomeLoja || "N/A",
        piso: data.piso || "N/A",
        numero: data.numero,
        medicao: data.medicao || 0,
        ultimaMedicao: data.medicao || 0,
        andar: data.andar || "N/A",
        localRelogio: data.andar ? data.andarRelogio : data.localRelogio,
        relogio: data.relogio,
        descricao: data.descricao || "N/A",
        //  photo: data.photo || "N/A",
        data: formatoDate,
      });
      toast.success("Loja cadastrada com sucesso!");
      setTimeout(() => {
        window.location.reload(); // Atualiza a página após cadastro
      }, 2000);
    } catch (e) {
      toast.error("Ops, erro ao cadastrar a loja.");
      console.error("Erro ao salvar no Firestore:", e);
    }
  }

  /**
   * Função para obter os dados de medição de uma loja específica.
   * @param {string} idURL - ID do shopping.
   * @param {string} buscaId - ID da loja.
   */
  async function getInfo(idURL, buscaId) {
    const idShopping = `shopping-${idURL}`;
    const docRef = doc(db, idShopping, buscaId);

    try {
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();
      setListaEnergia(data); // Define os dados da loja no estado
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Função para listar medições de todas as lojas de um shopping.
   * @param {string} idURL - ID do shopping.
   * @param {string} compUrl - Tipo de complexo ("shopping" ou outro).
   */
  async function getShop(idURL, compUrl) {
    const idShopping = `${compUrl}-${idURL}`;
    const docRef = collection(db, idShopping);

    try {
      const snapshot = await getDocs(docRef);
      const lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(), // Desestrutura os dados do documento
        });
      });

      setListaEnergia(lista); // Atualiza a lista de medições no estado
    } catch (e) {
      console.error(e);
    }
  }

  // Provedor do contexto para os componentes filhos
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
        getInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
