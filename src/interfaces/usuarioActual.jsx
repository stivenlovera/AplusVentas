import { Rol } from "./Rol";
export interface UsuarioActual {
    usuario: string;
    nombre: string;
    apellido: string;
    dirrecion: string;
    roles: Rol[];
}