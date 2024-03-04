import React from 'react';
import Header from './sections/Header';
import HomePage from './sections/HomePage';
import Country from './sections/Country';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  return (
  <>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/country/:countryName' element={<Country/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;