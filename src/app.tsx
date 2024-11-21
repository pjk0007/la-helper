import Home from './frontend/pages/Home';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './global.css';

const root = createRoot(document.body);
root.render(
  <HashRouter>
    <Routes>
      <Route path={'/'} element={<Home />} />
    </Routes>
  </HashRouter>
);
