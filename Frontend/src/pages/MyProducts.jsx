import React from 'react'

import PostContainer from '../components/profile/PostContainer'
import MenuProfile from '../components/profile/MenuProfile'
import useFetchProducts from '../assets/hooks/useFetchProducts'


const MyProducts = () => {
  const products = useFetchProducts();

  return (
    <>
    <MenuProfile/>
    <PostContainer products={products}/>
    </>
    
  )
}

export default MyProducts