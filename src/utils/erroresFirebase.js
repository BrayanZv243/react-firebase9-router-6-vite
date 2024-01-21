export const erroresFirebase = (code) => {
    switch (code) {
        case "auth/invalid-credential":
            return {
                code: "email",
                message: "Credenciales Inválidas",
            };
        case "auth/email-already-in-use":
            return {
                code: "password",
                message: "Usuario ya registrado",
            };
        case "auth/invalid-email":
            return {
                code: "password",
                message: "Email inválido",
            };
        case "auth/too-many-requests":
            return {
                code: "password",
                message: "¡Tranquilo vaquero, más despacio!",
            };
        default:
            return {
                code: "email",
                message: "Ocurrió un error inesperado",
            };
    }
};
