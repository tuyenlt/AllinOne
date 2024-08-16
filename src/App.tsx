import { Routes, Route, BrowserRouter } from "react-router-dom";
import routes from "./pages/routes";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/Login/Login";
import Regester from "./pages/Regester/Regester.";
import HomeNavbar from "./home/HomeNavbar";

function App() {
  return (<>
    <BrowserRouter>
      <AuthProvider>
        <ProtectedRoute>
          <HomeNavbar></HomeNavbar>
        </ProtectedRoute>
        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path="/regester" element={< Regester />} />
          {routes.map(({ component: Component, path }, index) => (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </>
  );
}

export default App;
