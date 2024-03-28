import { useState,useEffect, useContext,createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children})=>{
    const [auth,setAuth]= useState({
        user:null,
        token:"",
    });
    useEffect(()=> {
        const data =localStorage.getItem('auth')
       //if data is present in the local storage
        if(data){
            const parseData = JSON.parse(data);
            //thn we set our global state that is auth,setauth
            setAuth({
                ...auth,
                user: parseData.user,
                token:parseData.token,
            });
        }
    },[auth]);
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

//custom hook
const useAuth = () => useContext(AuthContext);

export{ useAuth,AuthProvider};