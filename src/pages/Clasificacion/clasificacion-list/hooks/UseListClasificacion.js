import { useState } from "react";
import { searchByNombre } from "../components/utils-clasificacion";
import { ObtenerClasificacionService } from "Services/api-ventas-erp/clasificacionService";

const UseListClasificacion = () => {

  const [filteredItem, setFilteredItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filter = () => {
    const result = searchByNombre(filteredItem, searchValue);
    setFilteredItem(result);
  }
  const listar = async () => {
    const { data } = await ObtenerClasificacionService();
    setFilteredItem(data.data)
  }
  return {
    filteredItem,
    setFilteredItem,
    searchValue,
    setSearchValue,
    filter,
    listar
  }
}

export default UseListClasificacion
