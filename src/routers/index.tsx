import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../modules/Layout";
import { AuthProvider, RequireAuth } from "./AuthProvider";
import { Home, Login, Register } from "../modules";
import { Profile } from "modules/User";

const Routers = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <>Protected</>
              </RequireAuth>
            }
          />
          <Route element={<Layout />}>
            <Route
              path="/profile"
              element={
                // <RequireAuth>
                  <Profile />
                // </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routers;
