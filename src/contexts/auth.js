// dependencies
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser));
        }

        // to avoid page loading without properly gathering the user info from localStorage, we must use a state to wait for it. When the data fetch is ended, then we set Loading to false and then we render the page (this last one is made on Routes file)
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // console.log('login auth', { email, password });

        // call api
        const response = await fetch('/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const body = await response.json();

        if (response.status === 403) {
            alert("Email ou senha incorretos!")
        }


        // creating a session api
        const loggedUser = {
            id: body.id,
            email: body.email
        };

        // saving user on localStorage
        localStorage.setItem('user', JSON.stringify(loggedUser));

        if (body.email) {
            setUser(loggedUser);
            navigate('/home');
        }
    };

    const logout = () => {
        console.log('logout');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    // !!user:
    // user != null, then authenticated = true
    // user == null, then authenticated = false

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/*
O contexto é como se fosse uma memória central disponível para gravar certas informações globais, por exemplo, um usuário logado.
Esse contexto deverá ser importado no arquivo de rotas e deve envolver todas as rotas que precisam ter acesso aos dados desse contexto. Usaremos o localStorage para armazenar os dados.
*/