import { Permiso } from "./Permiso";
export interface Rol {
    rolId: number;
    nombre: string;
    permisos: Permiso[];
}