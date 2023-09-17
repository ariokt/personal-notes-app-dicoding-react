import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { register } from '../../utils/api';
import { MdOutlineGTranslate } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import LocaleContext from '../../contexts/LocaleContext';

function RegisterPage() {
    const navigate = useNavigate();
    const [name, handleName] = useInput('');
    const [email, handleEmail] = useInput('');
    const [password, handlePassword] = useInput('');
    const [confirmPassword, handleConfirmPassword] = useInput('');

    const { contextLang, contextTheme } = useContext(LocaleContext);

    async function onRegister(e) {
      e.preventDefault();
      if (password === confirmPassword) {
        const { error } = await register({ name, email, password });
        if (!error) {
          navigate('/login');
        }
      } else {
        window.alert('password dan confirm password tidak sesuai!');
      }
    }

    const handleLang = () => {
      if (contextLang.lang === 'id') {
        contextLang.handleLang('eng');
        localStorage.setItem('lang', 'eng');
      } else {
        contextLang.handleLang('id');
        localStorage.setItem('lang', 'id');
      }
    }

    const handleTheme = () => {
      if (contextTheme.theme === 'light') {
        contextTheme.handleTheme('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        contextTheme.handleTheme('light');
        localStorage.setItem('theme', 'light');
      }
    }
    console.log(contextTheme.theme)
   
    return (
      <section className='login-page'>
        <div className='d-flex flex-column flex-md-row gap-md-2'>
          <h2>{contextLang.lang === 'id' ? 'Selamat datang di Ario Notes' : 'Welcome to Ario Notes'}</h2>
          <div className='d-flex gap-2 justify-content-center align-items-center'>
            <MdOutlineGTranslate style={{fontSize:"32px"}} onClick={handleLang} />
            {contextTheme.theme === 'light' ? <IoMdMoon style={{fontSize:"32px"}} onClick={handleTheme} /> : <IoMdSunny style={{fontSize:"32px"}} onClick={handleTheme} />}
          </div>
        </div>
        <form onSubmit={onRegister} className='login-input'>
            <input type="name" placeholder='Name' value={name} onChange={handleName} />
            <input type="email" placeholder='Email' value={email} onChange={handleEmail} />
            <input type="password" placeholder='Password' value={password} onChange={handlePassword} />
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPassword} />
            <button>{contextLang.lang === 'id' ? 'Daftar' : 'Register'}</button>
        </form>
        <p>{contextLang.lang === 'id' ? 'Sudah punya akun?' : 'Have an account?'} <Link to="/login">{contextLang.lang === 'id' ? 'Login di sini.' : 'Login Here' }</Link></p>
      </section>
    );
  }
   
  export default RegisterPage;