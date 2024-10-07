import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchRegister, selectIsAuth } from "../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <section className="registration">
        <form className="registration__form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="registration__h2" >Регистрация</h2>
            <input type="text" {...register('fullName', { required: 'Укажите полное имя' })} placeholder="Имя" />
            <input type="email" {...register('email', { required: 'Укажите почту' })} placeholder="E-Mail" />
            <input type="password" {...register('password', { required: 'Укажите пароль' })} placeholder="Пароль" />
            <input className="registration__submit" type="submit" value="Зарегистрироваться" />
        </form>
    </section>
  );
};
