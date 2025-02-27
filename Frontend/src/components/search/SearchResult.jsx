import React, { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { Container, Form, Row } from 'react-bootstrap';

const SearchResult = () => {
  const {result, setResult,resultProduct, setResultProduct } = useContext(ProductContext);
  console.log("resultado", resultProduct);

  const clickSearch = (valor) => {
    setResultProduct(valor)
    setResult([])
  }


  return (
    <div id='resultList' className='align-items-start' >
      <Container className='d-flex flex-column rounded-2 mt-0 ms-2 resultListArea'>

          { result.map((resultIter,id_product) => {
            return <div key={id_product} id ='search-result' className='rounded-3 px-3' onClick={(e) =>clickSearch(resultIter)}> {resultIter.product_name}</div>
          })
          }

      
      </Container>
  
    </div>
  )
}

export default SearchResult
