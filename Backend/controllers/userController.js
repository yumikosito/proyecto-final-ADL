const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken');
require('dotenv').config();
const crypto = require("crypto");

const { getUser, registerUser, loginUser, editUser, editAddressUser, deleteUser, tokenIDAdd, tokenIDRemove } = require('../modules/users');
const { passEmailConfirm, emailValid, usernameValid, inputNotEmpty } = require('../middlewares/validation');



exports.getUsers = async(req,res) => {
  try {
    const user = await getUser(req)
    

    if(!user){
     return res.status(404).json({msg: "Usuario no encontrado"})
    }

    res.status(200).send( {
      id_user: user.id_user, 
      username: user.username,
      name: user.name, 
      lastname: user.lastname,
      email: user.email,
      birthday: user.birthday.toISOString().split('T')[0],
      address: user.address
    }
  );

  } catch (error) {
    res.status(500).json({msg: "No se encontro usuario", 'error': error.message});
  }
};



exports.registerUsers = async(req,res) => {
  try {
    let {username, name, lastname, email, password, birthday, password_confirm, email_confirm} = req.body;
    const passEmailC = await passEmailConfirm(email,email_confirm, password, password_confirm); 
    const usernameV = await usernameValid(username);
    const emailV = await emailValid(email);

    if(passEmailC && emailV && usernameV){
      password = await bcrypt.hash(password,12)
      await registerUser(username, name, lastname, email, password, birthday);
      res.status(201).json({msg:"Usuario registrado satisfactoriamente",'user_details': { 'username': username, 'email': email}})

    } else if (passEmailC && !emailV && usernameV){
      res.json({msg:"El email ya esta en uso"})

    } else if (passEmailC && emailV && !usernameV){
      res.json({msg:"El usuario ya esta en uso"})

    } else if (!passEmailC){
      res.json({msg:"La contraseña o el email de confirmación no son iguales"})

    } else if (passEmailC && !emailV && !usernameV) {
      res.json({msg:"El usuario y el email ya estan en uso"})
    }

  } catch (error) {
    res.status(500).json({msg:"No se pudo registrar nuevo usuario", 'error': error.message})
  }
}



exports.loginUsers = async(req,res) =>{
  try {
    const { email,password } = req.body;
    const user = await loginUser(email);

    if(!user){
      return res.json({msg:"Usuario no encontrado"})
    } 

    if(!bcrypt.compareSync(password,user.password)){
      res.json({msg:"Contraseña incorrecta"})
      } else {
        const token = jwt.sign(
          {id_user: user.id_user,
            email: user.email,
            password: user.password,
            username:user.username,
            name: user.name,
            lastname: user.lastname,
            birthday: user.birthday,
            address:user.address,
          },
            process.env.TOKEN_PWD,
            {jwtid: crypto.randomUUID().toString() }
        )
        await tokenIDAdd(token);
        res.status(200).json({msg:"Autentificación correcta",'token':token})
      }
  
    
  } catch (error) {  
    res.status(500).json({msg:"No se pudo autenticar", 'error': error.message})
  }
}



exports.editUsers = async (req,res) =>{
  try {
    let { id_user, email, password, name, lastname } = await getUser(req)
    let { nameChange, lastnameChange, passwordChange, emailChange} = req.body;
    let passlength = false;
 
    if (passwordChange.length>=8){
      passlength = true;
    }

    let passLogout = false;
    let emailLogout = false;

    const passwordC = await bcrypt.compare(passwordChange, password);
    const emailChangeValid = await emailValid(emailChange);
    

    if(!inputNotEmpty(nameChange) && !inputNotEmpty(lastnameChange) && !inputNotEmpty(passwordChange) && !inputNotEmpty(emailChange)){
      return res.json({msg:"No hay ningun campo para editar"})
    }

    if( inputNotEmpty(nameChange) && name != nameChange ){
      name = nameChange;

    } else if( inputNotEmpty(nameChange) && name== nameChange){
      return res.json({msg:"Nombre es el mismo que tenía antes"})
    }

    if( inputNotEmpty(lastnameChange) && lastname!= lastnameChange ){
      lastname = lastnameChange;
      
    } else if( inputNotEmpty(lastnameChange) && lastname== lastnameChange){
      return res.json({msg:"Apellido es el mismo que tenía antes"})
    }

    if( inputNotEmpty(passwordChange) && !passwordC && passlength== true){
      password = await bcrypt.hash(passwordChange,12)
      passLogout = true;
      
    } else if(inputNotEmpty(passwordChange) && passwordC){
      return res.json({msg:"Contraseña es la misma que tenía antes"})

    } else if(inputNotEmpty(passwordChange) && passlength==false){
      return res.json({msg:"Contraseña no tiene 8 carácteres o más"})
    }

    if(inputNotEmpty(emailChange) && email != emailChange && emailChangeValid ){
      email = emailChange;
      emailLogout = true;

    } else if(inputNotEmpty(emailChange) && email== emailChange){
      return res.json({msg:"Email es el mismo que tenía antes"})

    } else if(inputNotEmpty(emailChange) && email != emailChange && !emailChangeValid){
      return res.json({msg:"Email ya existe en uso"})
    }

    await editUser(id_user, email, name, lastname, password)

    if(passLogout || emailLogout){
      const Authorization = req.header("Authorization")
      const token = Authorization.split("Bearer ")[1]
      await tokenIDRemove(token)
    }

    res.json({msg:"El usuario se modificó con éxito"})

  } catch (error) {
    res.status(500).json({msg:"No se pudo modificar el usuario", 'error': error.message})
  }
}



exports.editAddressUsers = async (req,res) =>{
  try {
    let { id_user, address } = await getUser(req);
    let { addressChange } = req.body;  

    if( inputNotEmpty(addressChange) && address != addressChange ){
      address= addressChange;

    } else if( inputNotEmpty(addressChange) && address == addressChange){
     return res.status(409).json({msg:"Dirección es la misma que tenía antes"})
    }

    await editAddressUser(id_user,address)
    res.status(200).json({msg:"La dirección se modificó con éxito"})

  } catch (error) {
    res.status(500).json({msg:"No se pudo modificar la dirección del usuario", 'error': error.message})
  }
}



exports.logout = async(req,res) =>{
  try {
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    await tokenIDRemove(token)
    res.status(200).json({msg:"El usuario cerró sesión con éxito"})

  } catch (error) {
    res.status(500).json({msg:"No se pudo desloguear al usuario", "error": error})
}}



exports.deleteUsers = async(req,res) => {
  try {
    const { id_user } = await getUser(req)
    
    let deleteUserConfirm = await deleteUser(id_user);

    if (deleteUserConfirm) {
      return res.status(200).json({ msg: "El usuario se eliminó con éxito" });
    }

    return res.status(404).json({ msg: "No se encontró el usuario para eliminar" });

  } catch (error) {
    res.status(500).json({msg:"No se pudo eliminar el usuario", 'error': error})
  }
}
