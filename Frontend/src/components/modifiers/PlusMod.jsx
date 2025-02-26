import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import { CartContext } from '../../context/CartContext'

const PlusMod = ({product}) => {
  const {quantityPlus} = useContext(CartContext)
  
  const Mod_quantity = (id) =>{
    quantityPlus(id)
  }
  
  return (
    <div>
      <Button className='p-1' variant='light'
      onClick={() => Mod_quantity(product.id_product)}
      ><Plus size={15}/>
      </Button>
    </div>
  )
}

export default PlusMod
