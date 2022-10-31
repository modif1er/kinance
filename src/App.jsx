import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { history } from "helpers";
import { Nav, PrivateRoute } from "components";
import { Home, Login } from "pages";

export { App };

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div>
      <Nav />
      <div className="app-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}