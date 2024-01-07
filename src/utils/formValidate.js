export const formValidate = () => {
    return {
        required: {
            value: true,
            message: "Campo Obligatorio",
        },
        patternEmail: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de email incorrecto",
        },
        minLength: {
            value: 6,
            message: "Mínimo 6 carácteres en contraseña.",
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) return "No seas payaso, escribe algo";
                return true;
            },
        },
        validateEquals(getValues) {
            return {
                equals: (v) =>
                    v === getValues("password") ||
                    "No coinciden las contraseñas",
            };
        },
    };
};
