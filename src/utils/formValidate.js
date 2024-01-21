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
        minLength(value) {
            return { value, message: "Mínimo 6 carácteres en contraseña." };
        },
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) return "No seas payaso, escribe algo";
                return true;
            },
        },
        validateEquals(value) {
            return {
                equals: (v) => v === value || "No coinciden las contraseñas",
            };
        },
    };
};
