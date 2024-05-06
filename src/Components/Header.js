// dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Button from "./Button";

// api
import api from "../api";

// assets
import userPic from "../assets/user.svg";

// contexts
import { AuthContext } from "../contexts/auth";

const Header = () => {
  const location = useLocation();
  const [userMenu, setUserMenu] = useState("");
  const [loggedUser, setLoggedUser] = useState(null);
  const { authenticated, user, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/cadastro"
    ) {
      setUserMenu("");
    } else if (authenticated) {
      // call api
      (async () => {
        const { id } = user;
        const { data } = await api.get(`/api/users/${id}`);
        setLoggedUser(data?.profilePictureUrl);
      })();

      setUserMenu(
        <Menu>
          <Menu.Button className="menu__button">
            <img
              className="header__user"
              src={loggedUser}
              alt="Usuário"
              data-test="sidenav-user"
            />
          </Menu.Button>
          <Menu.Items className="menu__content">
            <a
              className="button"
              href="/perfil"
              data-test="sidenav-user-profile"
            >
              Ver Perfil
            </a>
            <Button
              handleClick={handleLogout}
              dataTest="sidenav-user-logout"
              children="Logout"
            />
          </Menu.Items>
        </Menu>,
      );
    } else {
      setUserMenu(
        <Menu>
          <Menu.Button className="menu__button">
            <img
              className="header__user"
              src={userPic}
              alt="Usuário"
              data-test="sidenav-user"
            />
          </Menu.Button>
          <Menu.Items className="menu__content">
            <a className="button" href="/login" data-test="sidenav-user-login">
              Login
            </a>
          </Menu.Items>
        </Menu>,
      );
    }
  }, [location, handleLogout, authenticated, loggedUser, user]);

  return (
    <header className="header">
      <nav>
        <div>
          <img
            className="header__logo"
            src="logo-clear.svg"
            alt=""
            aria-hidden="true"
          />
          <Link
            className="header__home"
            aria-label="Tela inicial"
            data-test="sidenav-initial"
            to="/"
          />
          <Link
            className="header__message"
            to="/mensagem"
            aria-label="Ir para Mensagens"
            data-test="sidenav-message"
          />
        </div>
        {userMenu}
      </nav>
    </header>
  );
};

export default Header;
