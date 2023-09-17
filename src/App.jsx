import React, { useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivedPage from './pages/ArchivedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRouter from './routes/PrivateRouter';
import PublicRouter from './routes/PublicRouter';
import useToggle from './hooks/useToggle';
import LocaleContext from './contexts/LocaleContext';

function App() {

  const [lang, handleLang] = useToggle(localStorage.getItem('lang') || 'id'); //id or eng
  const [theme, handleTheme] = useToggle(localStorage.getItem('theme') || 'light'); //light or dark

  const contextLang = useMemo(() => {
    return {
      lang,
      handleLang
    }
  }, [lang]);

  const contextTheme = useMemo(() => {
    return {
      theme,
      handleTheme
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme])

  return (
      <BrowserRouter>
        <div className="notes-app">
          <LocaleContext.Provider value={{contextLang, contextTheme}}>
            <Routes>
              <Route path="/login" element={<PublicRouter><LoginPage /></PublicRouter>} />
              <Route path="/register" element={<PublicRouter><RegisterPage /></PublicRouter>} />
              <Route path="/" element={<PrivateRouter><HomePage /></PrivateRouter>} />
              <Route path="/archived-note" element={<PrivateRouter><ArchivedPage /></PrivateRouter>} />
              <Route path="/notes/:id" element={<PrivateRouter><DetailPage /></PrivateRouter>} />
              <Route path="/notes/add" element={<PrivateRouter><AddPage /></PrivateRouter>} />
              <Route path="*" element={<div>404 Page not found</div>} />
            </Routes>
          </LocaleContext.Provider>
        </div>
      </BrowserRouter>
  );
}

export default App;
