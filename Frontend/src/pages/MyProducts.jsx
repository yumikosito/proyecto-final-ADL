import React from 'react'
import PostContainer from '../components/profile/PostContainer'
import MenuProfile from '../components/profile/MenuProfile'
import useFetchProducts from '../assets/hooks/useFetchProducts'
import axios from 'axios'
import { useContext } from "react";
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2';


const MyProducts = () => {

  const {products, setProducts} = useFetchProducts();
  const {user} = useContext(UserContext)

   const handleDelete = async (id) => {
  
    const result = await Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#68D5E8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      color: "#323232",
    });
      if(!result.isConfirmed) return;
      if (confirm) {
        try {
          await axios.delete(
            `http://localhost:3000/api/productos/mis-productos/${id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          Swal.fire({
            title: "Producto eliminado",
            icon: "success"
          })
          setProducts((prevProducts) => prevProducts.filter((product) => product.id_product !== id));
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