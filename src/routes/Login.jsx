import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("brayan@test.com");
    const [password, setPassword] = useState("123123");
    const { loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Procesando Form...", email, password);

        try {
            await loginUser(email, password);
            console.log("Usuario Logeado");
            navigate("/");
        } catch (error) {
            console.log(error.code);
            if (error.code === "auth/invalid-credential")
                alert("Credenciales Inválidas");
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Ingrese Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Ingrese Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;
