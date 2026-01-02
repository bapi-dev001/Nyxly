import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const AuthContext = createContext();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    },[]);

    //  Login
    const login = async (email, password) => {
        try {

            const { data } = await axios.post('https://nyxlyapi.vercel.app/api/auth/login', {
                email,
                password,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return {success: true}

        } catch (error) {
            return {success: false, message: error.response?.data?.message || 'Login faield'}
        }
    };

    //  Register
    const register = async (username, fullName, email, password) => {
        try {

            const { data } = await axios.post('https://nyxlyapi.vercel.app/api/auth/register', {
                username,
                fullName,
                email,
                password,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            return {success: true}

        } catch (error) {
            return {success: false, message: error.response?.data?.message || 'Registration faield'}
        }
    };

    //  Logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, setUser, loading, login, register, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )

};

// export const useAuth = useContext(useContext)
export const useAuth = () => {
    return useContext(AuthContext)
}