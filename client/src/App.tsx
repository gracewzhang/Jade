import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';

const App = (): React.ReactElement => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="login" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
