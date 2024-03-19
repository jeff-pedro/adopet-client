// dependencies
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from '@headlessui/react';

// assets
import userPic from '../assets/user.svg';
// import loggedUser from '../assets/logged-user.png';
import Button from './Button';

// contexts
import { AuthContext } from '../contexts/auth';

const Header = () => {
  const location = useLocation();
  const [user, setUser] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);
  const { authenticated, user: userSession, logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/cadastro') {
      setUser('');
    } else if (authenticated) {
      // call api
      async function fetchUser() {
        try {
          const response = await fetch(`/api/tutors/${userSession.id}`);
          const result = await response.json();

          setLoggedUser(result?.profilePictureUrl);
        } catch (err) {
          console.log(err);
        }
      }

      fetchUser();

      setUser(
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
      setUser(
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
  }, [location, handleLogout, authenticated, loggedUser, userSession]);

  return (
    <header className='header'>
      <nav>
        <div>
          <img className='header__logo' src="logo-clear.svg" alt="" aria-hidden='true' />
          <Link className='header__home' aria-label='Tela inicial' to="/" ></Link>
          <Link className='header__message' to="/mensagem" aria-label='Ir para Mensagens'></Link>
        </div>
        {user}
      </nav>
    </header>
  );
};

export default Header;