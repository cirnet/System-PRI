import React, { createContext, useState } from "react";

const LoginContext=createContext()

export function LoginProvider({children}){
    const [userTest, setUserTest] = useState('')
    const addUserTest=(name)=>{
        setUserTest(setUserTest(name))
    }
    return(
        <LoginContext.Provider value={{userTest, setUserTest, addUserTest}}>{children}</LoginContext.Provider>
    )
}

export default LoginContext