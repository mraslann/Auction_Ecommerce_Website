import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Products from "./pages/Products";         // New products list page
import CreateProduct from "./pages/CreateProduct"; // Your product creation page
import EditProduct from "./pages/EditProduct"; // Your product edit page
import Cart from "./pages/Cart"; // Your cart page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />         {/* View products */}
        <Route path="/products/create" element={<CreateProduct />} /> {/* Create new */}
        <Route path="/profile" element={<Profile />} /> {/* View profile */}
        <Route path="/products/edit/:id" element={<EditProduct />} /> {/* Edit product */}
        <Route path="/cart" element={<Cart />} /> {/* View cart */}
      </Routes>
    </Router>
  );
}

export default App;
