import React, { createContext, useContext, useState } from 'react'
export const UserNameContext = createContext()
const UserNameContextProvider = ({ children }) => {
    const [UserName, setUserName] = useState("")
    return (
        <UserNameContext.Provider value={[UserName, setUserName]}>
            {children}
        </UserNameContext.Provider>
    )
}
export default UserNameContextProvider

export function useUserName() {
    return useContext(UserNameContext)
} 