import React from 'react';
import AccountMenu from './AccountMenu.jsx';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuth } from '../redux/slices/auth';

export const Header = () => {
  //const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  //const navigate = useNavigate();

  // const onClickLogout = () => {
  //   if (window.confirm('Вы действительно хотите выйти?')) {
  //     inputCheck();
  //     dispatch(logout());
  //     window.localStorage.removeItem('token');
  //     navigate('/');
  //   }
  // };

  // const inputCheck = () => {
  //   document.querySelector('input[type="checkbox"].input').checked = false;
  // }

  return (
    <header className='header'>
      <Link className='header__logo' to="/">BLOG</Link>
      <nav className='header__buttons'>
        {isAuth ? (
            <AccountMenu />
        ) : (
            <>
              <Link className='header__login' to="/login">Вход</Link>
              <Link className='header__register' to="/register">Регистрация</Link>
            </>
        )}
      </nav>
    </header>
  );
};
