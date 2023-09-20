import './App.css';
import Client from './Landing/Client/Client';
import Admin from './Landing/Admin/Admin';
import Alloted from './Landing/Client/alloted/Alloted';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Fixed import order

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/alloted" element={<Alloted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
