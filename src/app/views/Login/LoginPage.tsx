import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks/hook';
import { login } from '../../../redux/slices/authSlice';
import style from './login.module.css';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const onSubmit = (e) => {
    e.preventDefault();
        dispatch(login({ username, password })).then((action) => {
            console.log(action);
    //   localStorage.setItem('accessToken', action.payload.token);
      navigate('/');
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
            <label id={style.email} htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              id='username'
              placeholder='Username'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
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
