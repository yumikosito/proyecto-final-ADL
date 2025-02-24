import React, { createContext,useState, useEffect } from "react";

const ActiveContext = createContext()

const ActiveProvider = ({children}) => {
  const [activeLink,setActiveLink] = useState('home')
  const [profileActive,setProfileActive] = useState('')

  return <ActiveContext.Provider value = {{activeLink,setActiveLink, profileActive,setProfileActive}}>
    {children}
    </ActiveContext.Provider>
}

export {ActiveContext,ActiveProvider}
