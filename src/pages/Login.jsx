import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <section className="login">
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="login__h2" >Вход в аккаунт</h2>
            <input type="email" {...register('email', { required: 'Укажите почту' })} placeholder="E-Mail" />
            <input type="password" {...register('password', { required: 'Укажите пароль' })} placeholder="Пароль" />
            <input className="login__submit" type="submit" value="Войти" />
        </form>
    </section>
  );
};
