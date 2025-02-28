import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const UserContext=createContext()

const UserProvider = ({children}) => {
  const navigate = useNavigate()
  const [user,setUser] = useState([])
  const [userLog,setUserLog] = useState(false)  

  const registerUser = async (datos)  => {
    try {
      const res= await axios.post("http://localhost:3000/api/usuarios/registro",{email: datos.email,
        email_confirm:datos.email_confirm,
        password: datos.password,
        password_confirm:datos.password_confirm,
        username:datos.username,
        name: datos.name,
        lastname: datos.lastname,
        birthday: datos.birthday
      })
  
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
    } catch (error) {
      console.log("Error al registrar usuario nuevo",error);
      
    }
    
  }



  const logInUser = async (datos) => {
    try {
      const res= await axios.post("http://localhost:3000/api/usuarios/iniciar-sesion", {email: datos.email, password: datos.password})
    if (res.data.msg=="Autentificación correcta"){
      setUserLog(true)
      // setUser({"token":res.data.token})
      navigate('/')

      const res2= await axios.get('http://localhost:3000/api/usuarios/perfil',{
        headers:{
          Authorization:`Bearer ${res.data.token}`,
        },
      })
      const userData=res2.data;
      setUser({...userData, "token": res.data.token})

      
      
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
    } catch (error) {
      console.log("Error al iniciar sesion",error);
      
    }
    
  }



  const profileUser = async()=>{
    try {
      const res= await axios.get('http://localhost:3000/api/usuarios/perfil',{
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      })
      const userData=res.data;
      setUser({...userData, "token": user.token})
    } catch (error) {
      console.log("Error al obtener el perfil",error);
      
    }
    
  }



  const editProfile = async(nameChange, lastnameChange, passwordChange, emailChange) => {
    try {
      const res =  await axios.put("http://localhost:3000/api/usuarios/editar-perfil", {nameChange: nameChange.value, lastnameChange: lastnameChange.value, passwordChange: passwordChange.value, emailChange: emailChange.value},{
      headers:{
              Authorization:`Bearer ${user.token}`,
          },})

      if(res.data.msg=="No hay ningun campo para editar"){
          Swal.fire({
            title: "No hay ningun campo para editar",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        } else if (res.data.msg=="El usuario se modificó con éxito"){
          
          
           if(emailChange.length!=0 || passwordChange.length!=0){
            setUserLog(false);
            navigate('/')
            
          } else if(nameChange.length!=0 || lastnameChange.length!=0){
            navigate('/')
          }
          Swal.fire({
            title: "Perfil editado con exito",
            icon: "success",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
          
  
      } else if(res.data.msg=="Nombre es el mismo que tenía antes"){
          Swal.fire({
            title: "Nombre es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

      } else if(res.data.msg=="Apellido es el mismo que tenía antes"){
          Swal.fire({
            title: "Apellido es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

      } else if(res.data.msg=="Contraseña es la misma que tenía antes"){
          Swal.fire({
            title: "Contraseña es la misma que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

      } else if(res.data.msg=="Contraseña no tiene 8 carácteres o más"){
          Swal.fire({
            title: "Contraseña no tiene 8 carácteres o más",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

      } else if(res.data.msg=="Email ya existe en uso"){
          Swal.fire({
            title: "Email ya existe en uso",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        
      } else if (res.data.msg="Email es el mismo que tenía antes") {
          Swal.fire({
            title: "Email es el mismo que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

      

      } else {
          Swal.fire({
            title: "No se pudo modificar el usuario",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
      }
      
      
    } catch (error) {
      console.error("Error al editar datos:", error);
    }
  }



  const editAddress = async (addressChange) => {
    try {
      const res =  await axios.put("http://localhost:3000/api/usuarios/editar-direccion", {addressChange: addressChange.value},{
        headers:{
              Authorization:`Bearer ${user.token}`,
        },})

        if (res.data.msg=="La dirección se modificó con éxito"){
          profileUser()

          Swal.fire({
            title:"La dirección se modificó con éxito",
            icon: "success",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

        } else if (res.data.msg="Dirección es la misma que tenía antes") {
          Swal.fire({
            title: "Dirección es la misma que tenía antes",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })

        } else {
          Swal.fire({
            title: "No se pudo modificar la dirección del usuario",
            icon: "error",
            confirmButtonColor: "#68D5E8",
            color:"#323232"
          })
        }
      
    } catch (error) {
      console.error("Error al editar direccion:", error);
      }
    }


    
  const logoutUser = async () =>{
    try {
      const res = await axios.get("http://localhost:3000/api/usuarios/cerrar-sesion",{
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      });
      setUser([])
      setUserLog(false);
    } catch (error) {
      console.log("Error al cerrar sesion", error);
      
    }
  
  }



  // const delete_user = async () =>{
  //   await axios.delete("http://localhost:3000/api/usuarios/eliminar",{
  //     headers:{
  //       Authorization:`Bearer ${user.token}`,
  //     },
  //   })
  // }


  return <UserContext.Provider value={{user, registerUser, logInUser, userLog, profileUser, editProfile, editAddress, logoutUser}}>
  {children}
  </UserContext.Provider>

}
export {UserContext, UserProvider}