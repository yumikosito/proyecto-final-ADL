import React, { useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { UserContext } from '../../context/UserContext'
import Swal from 'sweetalert2'

const DeleteUser = () => {
  const {delete_user} = useContext(UserContext)
  
  const deleteButton = () =>{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás segur@?",
      text: "¡No vas a poder restaurar tu usuario después, es DEFINITIVO!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, borra todo!",
      cancelButtonText: "¡No, se cancela!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) { delete_user()
        swalWithBootstrapButtons.fire({
          title: "¡Usuario borrado!",
          text: "Tu usuario, productos y todo lo relacionado han sido eliminados",
          icon: "success"
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) { 
        swalWithBootstrapButtons.fire({
          title: "Se canceló el borrar usuario",
          text: "Tu usuario NO ha sido eliminado",
          icon: "error"
        });
      }
    });
  }

  return (
    <div className='deleteUser'>
    <Container className='whiteColor mb-3'>
      <Row className=''>
          <h1 id='titleProfile' className='my-4'>Eliminar cuenta</h1>
     </Row>
      <Col className="deletebuttonDiv d-flex justify-content-end">
        <Button className='deleteButton mt-1 py-0 px-2 ms-0' variant="danger" onClick={deleteButton}>
            <p className='registerLoginButtonText align-items-end'>Al hacer click en el boton se va a ELIMINAR la cuenta</p>
        </Button>
      </Col>
       
    

    </Container>
  </div>
  )
}

export default DeleteUser
