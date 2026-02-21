import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Invite from './pages/Invite';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/invite/:code" element={<Invite />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
