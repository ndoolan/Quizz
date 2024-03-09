import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { login } from '../../../redux/slices/authSlice';
import style from './login.module.css';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const onSubmit = (e) => {
    e.preventDefault();
      dispatch(login({ email, password })).then((action) => {
    //   localStorage.setItem('accessToken', action.payload.token);
      navigate('/home');
    });
  };

  return (
    <div className={style.body}>
      <div className={style.logo}>
        <h1>Logo</h1>
      </div>
      <div className={style.form}>
        <h1 className={style.main}>Login</h1>
        <form onSubmit={onSubmit}>
          <div className={style.divs}>
            <label id={style.email} htmlFor='email'>
              Email
            </label>
            <input
              type='text'
              id='email'
              placeholder='Email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.divs}>
            <label id={style.pass} htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={style.button} type='submit'>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
