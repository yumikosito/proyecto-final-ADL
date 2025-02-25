import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const UserContext=createContext()

const UserProvider = ({children}) => {
  const navigate = useNavigate()

  const [user,setUser] = useState([])

  const [userLog,setUserLog] = useState(false)
  console.log(user,userLog);
  

  // const registerUser = async (datos)  => {
  //   const search = user.some( mail => mail.email===datos.email)

  //   if (search==false){
  //     Swal.fire({
  //       title: "Registro correcto",
  //       icon: "success",
  //       confirmButtonColor: "#68D5E8",
  //       color:"#323232"
  //     }) 
  //     setUser([...user, datos])
  //     console.log(user);
      
  //   } else {
  //     Swal.fire({
  //       title: "Usuario ya existe",
  //       icon: "error",
  //       confirmButtonColor: "#68D5E8",
  //       color:"#323232"
  //     })
  // }}

  // const logInUser = async (datos) => {
  //   if (user.length===0){
  //     Swal.fire({
  //       title: "No existe el usuario",
  //       icon: "error",
  //       confirmButtonColor: "#68D5E8",
  //       color:"#323232"
  //     })
  //   } else{
  //     const search=user.find(mail => mail.email===datos.email)
      
  //     if (datos.password===search.password){
  //       Swal.fire({
  //         title: "Autentificación correcta",
  //         icon: "success",
  //         confirmButtonColor: "#68D5E8",
  //         color:"#323232"
  //       })
        
  //       setUserLog({...search, logged:true})
  //       navigate('/')

  //     } else if(datos.password!=search.password){
  //       Swal.fire({
  //         title: "Contraseña incorrecta",
  //         icon: "error",
  //         confirmButtonColor: "#68D5E8",
  //         color:"#323232"
  //       })
  //     } else {
  //       Swal.fire({
  //         title: "No existe el usuario",
  //         icon: "error",
  //         confirmButtonColor: "#68D5E8",
  //         color:"#323232"
  //       })
  //     }
  //     }
    
  
  // }

    const registerUser = async (datos)  => {
      const res= await axios.post("http://localhost:3000/api/usuarios/registro",{email: datos.email,
        email_confirm:datos.email_confirm,
        password: datos.password,
        password_confirm:datos.password_confirm,
        username:datos.username,
        name: datos.name,
        lastname: datos.lastname,
        birthday: datos.birthday
      })
      // localStorage.setItem("token", res.data.token)
      if (res.data.msg=="Usuario registrado satisfactoriamente"){
        Swal.fire({
          title: "Registro correcto",
          icon: "success",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        })
      } else if (res.data.msg=="El email ya esta en uso"){
        Swal.fire({
          title: "El email ya esta en uso",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        }) 
      } else if (res.data.msg=="El usuario ya esta en uso"){
        Swal.fire({
          title: "El usuario ya esta en uso",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        }) 
      } else if (res.data.msg=="La contraseña o el email de confirmación no son iguales"){
        Swal.fire({
          title: "La contraseña o el email de confirmación no son iguales",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        }) 
      } else if (res.data.msg=="El usuario y el email ya estan en uso"){
        Swal.fire({
          title: "El usuario y el email ya estan en uso",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        }) 
      } else {
        Swal.fire({
          title: "No se pudo registrar nuevo usuario",
          icon: "error",
          confirmButtonColor: "#68D5E8",
          color:"#323232"
        }) 
      }
    }


  const logInUser = async (datos) => {
    const res= await axios.post("http://localhost:3000/api/usuarios/iniciar-sesion", {email: datos.email, password: datos.password})
    localStorage.setItem("token", res.data.token)
    
    
    if (res.data.msg=="Autentificación correcta"){
      setUserLog(true)
      setUser({"token":res.data.token})
      navigate('/')
      
      
      Swal.fire({
        title: "Autentificación correcta",
        icon: "success",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
    } else if (res.data.msg=="Contraseña incorrecta") {
      Swal.fire({
        title: "Contraseña incorrecta",
        icon: "error",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
    } else if(res.data.msg=="Usuario no encontrado"){
      Swal.fire({
        title: "No existe el usuario",
        icon: "error",
        confirmButtonColor: "#68D5E8",
        color:"#323232"
      })
    }
  }

  const profileUser = async()=>{
    const token= user.token
    const res= await axios.get('http://localhost:3000/api/usuarios/perfil',{
      headers:{
        Authorization:`Bearer ${token}`,
    },
  })
  const userData=res.data;
  setUser({...userData, token})
  }




  return <UserContext.Provider value={{user,setUser,registerUser,logInUser,userLog,setUserLog, profileUser}}>
  {children}
  </UserContext.Provider>

}
export {UserContext, UserProvider}