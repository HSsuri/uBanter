import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PageNotFound from "./Pages/NotFound";
import "./styles.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import EmailForgot from "./Pages/EmailForgot";
import ForgotPassword from "./Pages/ForgotPassword";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotpassword" element={<EmailForgot />} />
          <Route path="resetpassword" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
          

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;