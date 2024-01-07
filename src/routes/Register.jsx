import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext, useState } from "react";
import { get, useForm } from "react-hook-form";

const Register = () => {
    const { registerUser } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            email: "brayan2@test.com",
        },
    });

    const onSubmit = async ({ email, password }) => {
        console.log("Procesando Form...", email, password);

        try {
            await registerUser(email, password);
            console.log("Usuario Creado");
            navigate("/");
        } catch (error) {
            console.log(error);

            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("email", { message: "Usuario ya registrado" });
                    break;
                case "auth/invalid-email":
                    setError("email", { message: "Email inválido" });
                    break;
                default:
                    setError("email", {
                        message: "Ocurrió un error inesperado",
                    });
            }
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Ingrese Email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Campo Obligatorio",
                        },
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Formato de email incorrecto",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    placeholder="Ingrese Password"
                    {...register("password", {
                        setValueAs: (v) => v.trim(),
                        minLength: {
                            value: 6,
                            message: "Mínimo 6 carácteres en contraseña.",
                        },
                        validate: {
                            trim: (v) => {
                                if (!v.trim())
                                    return "No seas payaso, escribe algo";
                                true;
                            },
                        },
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    type="password"
                    placeholder="Confirme Password"
                    {...register("repassword", {
                        setValueAs: (v) => v.trim(),
                        validate: {
                            equals: (v) =>
                                v === getValues("password") ||
                                "No coinciden las contraseñas",
                        },
                    })}
                />
                {errors.repassword && <p>{errors.repassword.message}</p>}
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;
