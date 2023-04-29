import { useState } from "react";
import { searchByProceso } from "../utils/utilsProceso";
import { ObtenerProcesoService } from "Services/api-ventas-erp/procesoService";

export const UseListProceso = () => {

  const [filteredItem, setFilteredItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filter = () => {
    const result = searchByProceso(filteredItem, searchValue);
    setFilteredItem(result);
  }
  const listar = async () => {
    const { data } = await ObtenerProcesoService();
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
