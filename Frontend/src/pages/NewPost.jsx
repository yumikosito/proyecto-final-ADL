import MenuProfile from '../components/profile/MenuProfile'
import React from 'react'
import NewPostForm from '../components/profile/NewPostForm';

const NewPost = () => {
  return (
    <div>
      <MenuProfile/> 
      <NewPostForm/>
    </div>
  )
}

export default NewPost