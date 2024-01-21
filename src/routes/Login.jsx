import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const { loginUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim } = formValidate();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            email: "brayan2@test.com",
            password: "123123",
        },
    });

    const onSubmit = async ({ email, password }) => {
        try {
            await loginUser(email, password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
            const { code, message } = erroresFirebase(error.code);

            setError(code, { message });
        }
    };

    return (
        <>
            <Title text="Login" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese Email"
                    label="Ingresa tu Correo"
                    error={errors.email}
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}
                >
                    <FormError error={errors.email} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Ingrese Password"
                    label="Ingresa tu Contraseña"
                    error={errors.password}
                    {...register("password", {
                        minLength,
                        validate: validateTrim,
                    })}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <Button text="Login" type="submit" />
            </form>
        </>
    );
};

export default Login;
