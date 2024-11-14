import Home from './frontend/pages/Home';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './frontend/pages/Login';
import './global.css';
import Work from './frontend/pages/Work';

const root = createRoot(document.body);
root.render(
  <HashRouter>
    <Routes>
      <Route path={'/'} element={<Login />} />
      <Route path={'/home'} element={<Home />} />
      <Route path={'/work'} element={<Work />} />
    </Routes>
  </HashRouter>
);
