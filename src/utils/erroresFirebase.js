export const erroresFirebase = (code) => {
    switch (code) {
        case "auth/invalid-credential":
            return "Credenciales Inválidas";
        case "auth/email-already-in-use":
            return "Usuario ya registrado";
        case "auth/invalid-email":
            return "Email inválido";
        default:
            return "Ocurrió un error inesperado";
    }
};
