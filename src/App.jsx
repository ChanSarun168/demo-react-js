// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ToastProvider, useToast } from "./components/Toast";
import Dropdown from "./components/Dropdown";
import AppLayout from "./components/layout/AppLayout"
import Home from "./components/page/Home"


const Category = () => <h2 className="text-xl font-semibold">Profile Page</h2>;
const Product = () => <h2 className="text-xl font-semibold">Settings Page</h2>;

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
