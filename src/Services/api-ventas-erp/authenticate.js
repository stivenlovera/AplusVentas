import axios from "axios";

export async function LoginService(usuario, password) {
    return await axios.post(`${process.env.REACT_APP_API}api/UsuarioControllers/login`, { usuario, password });
}
export async function Authenticate() {
    return await axios.get(`${process.env.REACT_APP_API}api/Clasificacion/create`);
}