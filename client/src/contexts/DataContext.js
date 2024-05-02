import React ,{useState,createContext} from 'react';
export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    
    const [ isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('userInfo') ? true : false);
    const [ userRole,setUserRole]= useState(localStorage.getItem('userInfo')  ? JSON.parse(localStorage.getItem('userInfo')).role : 'applicant');
    const [ userInfo , setUserInfo] = useState(localStorage.getItem('userInfo')  ?  JSON.parse(localStorage.getItem('userInfo')) : {});

  return <DataContext.Provider value = {{
    isAuthenticated , setIsAuthenticated,
    userRole, setUserRole,
    userInfo , setUserInfo
    }} >
    {children}
  </DataContext.Provider>
}