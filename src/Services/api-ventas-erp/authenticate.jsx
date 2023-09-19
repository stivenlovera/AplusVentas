import axios from "axios";
import { AxiosRequest } from "utils/axios";
AxiosRequest()
export async function LoginService(usuario, password) {
    console.log(process)
console.log(`${variable1}`)

    return await axios.post(`${process.env.REACT_APP_API}api/Autenticacion/Login`, { usuario, password });
}
export async function Authenticate() {
    return await axios.get(`${process.env.REACT_APP_API}api/Autenticacion/ObtenerDatosUsuario`);
}