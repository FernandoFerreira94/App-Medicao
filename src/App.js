import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RoutesApp from "./routes";
import AuthProvider from "./contexts/auth";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GlobalStyles />
          <ToastContainer autoClose={2000} />
          <RoutesApp />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
