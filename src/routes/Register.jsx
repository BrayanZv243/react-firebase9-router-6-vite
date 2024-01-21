import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
    const { registerUser } = useContext(UserContext);
    const { required, patternEmail, minLength, validateTrim, validateEquals } =
        formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
            const { code, message } = erroresFirebase(error.code);

            setError(code, { message });
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <Title text="Register" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese Email"
                    label="Ingresa tu correo"
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
                    label="Ingresa tu password"
                    error={errors.password}
                    {...register("password", {
                        minLength: minLength(6),
                        validate: validateTrim,
                    })}
                >
                    <FormError error={errors.password} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Confirme Password"
                    label="Vuelve a ingresas tu password"
                    error={errors.repassword}
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                >
                    <FormError error={errors.repassword} />
                </FormInput>

                <Button text="Register" type="submit" />
            </form>
        </>
    );
};

export default Register;
