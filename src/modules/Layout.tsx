import { useAppSelector } from "app/hooks";
import { Outlet } from "react-router-dom";
import { Header, HeaderLogged } from "../components";

const Layout = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div>
      {isAuth ? <HeaderLogged /> : <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
