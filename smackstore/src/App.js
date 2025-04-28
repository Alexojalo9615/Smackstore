import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NavbarCon from './components/Navbar';
import Register from './pages/Register';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Magliette from './pages/Magliette';
import Figures from './pages/Figures';
import Covers from './pages/Covers';
import CreatePost from './pages/crud/CreatePost';
import MyPosts from './pages/crud/MyPosts';
import EditProductPage from './pages/crud/EditProductPage';
import PaymentSuccess from './components/SuccessPage';
import PaymentFailure from './components/FailurePage';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavbarCon />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/magliette" element={<Magliette />} />
          <Route path="/shop/action-figures" element={<Figures />} />
          <Route path="/shop/cover" element={<Covers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/cancel" element={<PaymentFailure />} />
        </Routes>
        <Footer/>
        <ToastContainer   position="top-center" style={{color: "red"}} autoClose={5000}/>
      </Container>
    </Router>
  );
}

export default App;
