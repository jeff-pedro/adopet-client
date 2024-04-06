// dependencies
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import Button from './Button';

// api
import api from '../api';

// assets
import userPic from '../assets/user.svg';

// contexts
import { AuthContext } from '../contexts/auth';

const Header = () => {
  const location = useLocation();
  const [userMenu, setUserMenu] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const { authenticated, user, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {

    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/cadastro') {
      setUserMenu('');
    } else if (authenticated) {
      
      // call api
      (async () => {
        const { id } = JSON.parse(user);
        const { data } = await api.get(`/api/tutors/${id}`);
        setLoggedUser(data?.profilePictureUrl);
      })();

      setUserMenu(
        <Menu>
          <Menu.Button className="menu__button">
            <img className='header__user' src={loggedUser} alt="Usuário" />
          </Menu.Button>
          <Menu.Items className='menu__content'>
            <a className='button' href="/perfil">Ver Perfil</a>
            <Button handleClick={handleLogout} children="Logout"></Button>
          </Menu.Items>
        </Menu>
      );
    } else {
      setUserMenu(
        <Menu>
          <Menu.Button className="menu__button">
            <img className='header__user' src={userPic} alt="Usuário" />
          </Menu.Button>
          <Menu.Items className='menu__content'>
            <a className='button' href="/login">Login</a>
          </Menu.Items>
        </Menu>
      );
    }
  }, [location, handleLogout, authenticated, loggedUser, user]);

  return (
    <header className='header'>
      <nav>
        <div>
          <img className='header__logo' src="logo-clear.svg" alt="" aria-hidden='true' />
          <Link className='header__home' aria-label='Tela inicial' to="/" ></Link>
          <Link className='header__message' to="/mensagem" aria-label='Ir para Mensagens'></Link>
        </div>
        {userMenu}
      </nav>
    </header>
  );
};

export default Header;