import React from 'react'
import PostContainer from '../components/profile/PostContainer'
import MenuProfile from '../components/profile/MenuProfile'
import useFetchProducts from '../assets/hooks/useFetchProducts'
import axios from 'axios'
import { useContext } from "react";
import { UserContext } from '../context/UserContext'

const MyProducts = () => {

  const {products, setProducts} = useFetchProducts();
  const {user} = useContext(UserContext)

   const handleDelete = (id) => {
  
      const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
      if(!confirm) return;
      if (confirm) {
        try {
          axios.delete(
            `http://localhost:3000/api/productos/mis-productos/${id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          alert("Producto eliminado con id: ", id);
          setProducts((prevProducts) => prevProducts.filter((product) => product.id_product !== id));
          navigate("/perfil/mis-productos");
        } catch (error) {
          console.log(error)
        } 
      }
    };
  
  return (
    <>
    <MenuProfile/>
    <PostContainer products={products} handleDelete={handleDelete}/>
    </>
  )
}

export default MyProducts