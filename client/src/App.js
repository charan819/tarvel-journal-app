import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import View from "./pages/View";
import { useContext } from "react";
import { AuthContext } from "./authContext";

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const RedirectIfLoggedIn = ({ children }) => {
    return user ? <Navigate to="/" /> : children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/login"
          element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>}
        />
        <Route
          path="/register"
          element={<RedirectIfLoggedIn><Register /></RedirectIfLoggedIn>}
        />
        <Route
          path="/create"
          element={<ProtectedRoute><Create /></ProtectedRoute>}
        />
        <Route
          path="/view/:id"
          element={<ProtectedRoute><View /></ProtectedRoute>}
        />
        <Route
          path="*"
          element={<div style={{ padding: "2rem", textAlign: "center" }}>404 - Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
