import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";

const Register = () => {
    const { registerUser } = useContext(UserContext);
    const [email, setEmail] = useState("brayan@test.com");
    const [password, setPassword] = useState("123123");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log("Procesando Form...", email, password);

        try {
            await registerUser(email, password);
            console.log("Usuario Creado");
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.code === "auth/email-already-in-use")
                alert("Email en uso");
            if (error.code === "auth/invalid-email") alert("Email inválido");
        }
    };

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
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
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
