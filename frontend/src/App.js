import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Products from "./pages/Products";         // New products list page
import CreateProduct from "./pages/CreateProduct"; // Your product creation page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />         {/* View products */}
        <Route path="/products/create" element={<CreateProduct />} /> {/* Create new */}
      </Routes>
    </Router>
  );
}

export default App;
