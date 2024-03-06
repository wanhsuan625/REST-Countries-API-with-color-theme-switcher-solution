import React from 'react';
import Header from './sections/Header';
import HomePage from './sections/HomePage';
import Country from './sections/Country';
import Footer from './sections/Footer';
import { BrowserRouter , Routes , Route } from 'react-router-dom';

function App() {
  return (
  <>
    <BrowserRouter>
      <Header />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/country/:countryName' element={<Country/>} />        {/* :country 動態路徑 */}
      </Routes>

      <Footer/>
    </BrowserRouter>
  </>
  );
}

export default App;