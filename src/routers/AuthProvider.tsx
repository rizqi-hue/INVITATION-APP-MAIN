import { useAppDispatch } from "app/hooks";
import { setAuth } from "modules/Auth/services/AuthSlice";
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "utils/storage";

interface AuthContextType {
  user: any;
}

let AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  let [user] = React.useState<any>(getCookie("token"));

  useEffect(() => {
    let token = getCookie("token");
    if (token) {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
  }, [dispatch]);

  let value = { user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RedirectToProfile({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  console.log(location.pathname)

  if (auth.user) {
    if (location.pathname === '/login') {
      return <Navigate to="/profile" state={{ from: location }} replace />;
    }
  }

  return children;
}


export { AuthProvider, RequireAuth, RedirectToProfile };
