import { useState } from "react";
import { ObtenerTipoAsientoService } from "Services/api-ventas-erp/tipoAsiento";
import { searchByNombreTipoAsiento } from "../utils/searchTipoAsiento";

export const UseListTipoAsiento = () => {

  const [filteredItem, setFilteredItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filter = () => {
    const result = searchByNombreTipoAsiento(filteredItem, searchValue);
    setFilteredItem(result);
  }
  const listar = async () => {
    const { data } = await ObtenerTipoAsientoService();
    console.log(data.data)
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
