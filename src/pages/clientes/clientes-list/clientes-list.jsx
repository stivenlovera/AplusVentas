import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { H5 } from "components/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateClienteModal from "./components/create-cliente";
import ClienteColumns from "./components/cliente-columns";
import { clienteFake } from "./components/cliente-fake";
import { searchByName } from "./components/clientes-utils";
import { Context } from "./context/context";
import { ObtenerClienteService } from "Services/api-ventas-erp/clienteService";
export const HeadingWrapper = styled(FlexBox)(({
  theme
}) => ({
  marginBottom: 20,
  flexWrap: "wrap",
  [theme.breakpoints.down(530)]: {
    "& .MuiButton-root": {
      width: "100%"
    },
    "& .MuiInputBase-root": {
      maxWidth: "100%",
      marginBottom: 15
    }
  }
}));

const ClientesList = () => {
  const {
    t
  } = useTranslation();
  const [actualizarTable, setActualizarTableContext] = useState(false);
  const [openModal, setOpenModal] = useState(false); // search input

  const ApiClientes= async () => {
    const { data } = await ObtenerClienteService();
    console.log(data.message)
    setFilteredItem(data.data)
  }

  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState(clienteFake);
  useEffect(() => {
    ApiClientes()
    const result = searchByName(clienteFake, searchValue);
    setFilteredItem(result);
    setActualizarTableContext(false);
  }, [searchValue, actualizarTable]);

  return (
    <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
      <Box pt={2} pb={4}>
        <HeadingWrapper justifyContent="space-between" alignItems="center">
          <FlexBox gap={0.5} alignItems="center">
            <IconWrapper>
              <ShoppingBasket sx={{
                color: "primary.main"
              }} />
            </IconWrapper>
            <H5>Clientes</H5>
          </FlexBox>
          <SearchInput bordered={'true'} placeholder="Buscar clientes" onChange={e => setSearchValue(e.target.value)} />
          <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
            {t("Añadir cliente")}
          </Button>
        </HeadingWrapper>

        <CustomTable columnShape={ClienteColumns} data={filteredItem} />

        <CreateClienteModal open={openModal} onClose={() => setOpenModal(false)} tipo={'nuevo'} />
      </Box>
    </Context.Provider>
  );
};

export default ClientesList;