import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import { Form } from 'react-router-dom'
import { ProductContext } from '../../context/ProductContext'


const SearchProducts = () => {
  const [input,setInput] = useState("");
  const {result, setResult} = useContext(ProductContext)
  
  const fetchData = async (value) => {
    const res = await axios.get("https://proyecto-final-adl-backend.onrender.com/api/productos/buscar")
    const data = res.data;
  
    const resultProd = data.filter((prod) => {
      return value && prod && prod.product_name && prod.product_name.toLowerCase().includes(value)
    })
    setResult(resultProd)
  }

 
  return (
    <div id="searchBar"> 
      <Container className='align-items-center mt-1 mb-2'>
        <FormGroup>
        <FormLabel>Buscar producto existente</FormLabel>
 
          <Row>
            <Col xs={10} sm={9}>
              <FormControl onChange = {(e) =>fetchData(e.target.value) } onInput={(e) => e.target.value = ("" + e.target.value).toLowerCase()} type="text" placeholder="Figura Zidane FFXIV" className=" mr-sm-2 newPostColor"/>
            </Col>
            <Col xs={2} sm={3} className=''>
              <Search size={30} className='searchButton'/>
            </Col>
          </Row>
        </FormGroup>
     

      </Container>
    </div>
  )
}

export default SearchProducts
