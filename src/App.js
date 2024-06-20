import './styles/App.css';
import BasicButton from "./components/ui/basic-button/BasicButton";
import BasicForm from "./components/ui/basic-form/BasicForm";
import BasicInput from "./components/ui/basic-input/BasicInput";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BasicHeader from "./components/ui/header/BasicHeader";
import ProfileInfo from "./components/ui/profile-info/ProfileInfo";
import ProfilePage from "./pages/ProfilePage";
import {useEffect, useState} from "react";
import {AuthContext} from "./context/context";
import LoaderPage from "./pages/LoaderPage";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState({});

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
            setIsAuth(true);
            setToken(jwtDecode(localStorage.getItem('access_token')));
        }
        setLoading(false);
    }, [])

    return (
        <div className="App">
            <AuthContext.Provider value={
                {
                    isAuth,
                    setIsAuth,
                    isLoading,
                    token,
                    setToken
                }
            }>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
