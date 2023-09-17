import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { login, putAccessToken } from '../../utils/api';
import LocaleContext from '../../contexts/LocaleContext';
import { MdOutlineGTranslate } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

function LoginPage() {
    const navigate = useNavigate();
    const [email, handleEmail] = useInput('');
    const [password, handlePassword] = useInput('');
    
    const { contextLang, contextTheme } = useContext(LocaleContext);

    async function onLogin(e) {
      e.preventDefault();
      const { error, data } = await login({ email, password });
   
      if (!error) {
        putAccessToken(data.accessToken);
        navigate('/');
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
   
    return (
      <section className='login-page'>
        <div className='d-flex flex-column flex-md-row gap-md-2'>
          <h2>{contextLang.lang === 'id' ? 'Selamat datang di Ario Notes' : 'Welcome to Ario Notes'}</h2>
          <div className='d-flex gap-2 justify-content-center align-items-center'>
            <MdOutlineGTranslate style={{fontSize:"32px"}} onClick={handleLang} />
            {contextTheme.theme === 'light' ? <IoMdMoon style={{fontSize:"32px"}} onClick={handleTheme} /> : <IoMdSunny style={{fontSize:"32px"}} onClick={handleTheme} />}
          </div>
        </div>
        <form onSubmit={onLogin} className='login-input'>
            <input type="email" placeholder='Email' value={email} onChange={handleEmail} />
            <input type="password" placeholder='Password' value={password} onChange={handlePassword} />
            <button>{contextLang.lang === 'id' ? 'Masuk' : 'Login'}</button>
        </form>
        <p>{contextLang.lang === 'id' ? 'Belum punya akun?' : "Don't have an account?"  } <Link to="/register">{contextLang.lang === 'id' ? 'Daftar di sini.' : 'Register here.' }</Link></p>
      </section>
    );
  }
   
  export default LoginPage;