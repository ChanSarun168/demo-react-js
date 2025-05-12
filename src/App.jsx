import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dictionary from "./components/Dictionary";
import './App.css'
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path='/product' element = {<Product/>}/>
        {/* Dynamic Route */}
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="/product" element={<SearchProduct />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
