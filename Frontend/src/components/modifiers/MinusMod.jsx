import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Dash } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'

const MinusMod = ({product}) => {
  const {quantityMinus} = useContext(CartContext)

  const Mod_quantity = (id) =>{
    quantityMinus(id,product)
  }
  
  return (
    <div>
      <Button className='p-1' variant='light'
      onClick={() => Mod_quantity(product.id_product)}
      ><Dash size={15}/>
      </Button>
    </div>
  )
}

export default MinusMod