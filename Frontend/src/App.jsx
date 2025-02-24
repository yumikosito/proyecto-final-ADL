import './normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from './context/UserContext.jsx';

import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MyProducts from './pages/MyProducts.jsx';
import NuevaVenta from './pages/NuevaVenta'
import Profile from './pages/Profile'
import NavbarComponent from './components/NavbarComponent.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import CardDetail from './pages/CardDetail.jsx';
import EditPost from './pages/EditPost.jsx';
import MyOrders from './pages/MyOrders.jsx';
import NotFound from './pages/NotFound.jsx';
import OrderDetail from './pages/OrderDetail.jsx';

function App() {
  const {userLog}=useContext(UserContext)
  return (
    <>
    <NavbarComponent />
    <Header />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<CardDetail />} /> 
        <Route path="/login" element={!userLog.logged ? <Login />:<Navigate to='/'/>} />
        <Route path="/registro" element={!userLog.logged ? <Register />:<Navigate to='/'/>} />

        <Route path="/perfil/" element={userLog.logged ? <Profile />:<Navigate to='/login'/>} /> 
        <Route path="/perfil/nueva-venta" element={userLog.logged ? <NuevaVenta />:<Navigate to='/login'/>} />
        <Route path="/perfil/mis-productos" element={userLog.logged ? <MyProducts />:<Navigate to='/login'/>} />
        <Route path="/perfil/mis-productos/:id" element={userLog.logged ? <EditPost/>:<Navigate to='/login'/>} /> 
        <Route path="/perfil/pedidos-anteriores" element={userLog.logged ? <MyOrders />:<Navigate to='/login'/>} />
        <Route path="/perfil/pedidos-anteriores/:id" element={userLog.logged ? <OrderDetail />:<Navigate to='/login'/>} />
        <Route path="/carrito" element={userLog.logged ? <Cart />:<Navigate to='/login'/>} />
        
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
 
    <Footer />
    </>
  )
}

export default App
