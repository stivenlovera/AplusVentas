import { ObtenerPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useState } from "react";
import { searchByNombre } from "../utils/utilPlanCuenta";

export const UseListPlanCuenta = () => {

  const [filteredItem, setFilteredItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const filter = () => {
    const result = searchByNombre(filteredItem, searchValue);
    setFilteredItem(result);
  }
  const listar = async () => {
    const { data } = await ObtenerPlanCuentaService();
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
