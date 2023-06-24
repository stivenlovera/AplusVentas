import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { H5 } from "components/Typography";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { searchByName } from "./components/proveedor-util";
import ProveedorColumns from "./components/proveedor-columns";
import CreateProveedorModal from "./components/create-proveedor";
import { proveedorFake } from "./components/proveedor-fake";
import { CrearProveedorService, ObtenerProveedorService } from "Services/api-ventas-erp/proveedores";
import { Context } from "../context/actualizarTabla";

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

const ProveedorList = () => {
  const {
    t
  } = useTranslation();
  const [actualizarTable, setActualizarTableContext] = useState(false);
  const [openModal, setOpenModal] = useState(false); // search input

  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);

  const ApiProveedores = async () => {
    const { data } = await ObtenerProveedorService();
    console.log(data.message)
    setFilteredItem(data.data)
  }

  //use context para actualizar el update y  delete
  const OpenModal = async (estado) => {
    setOpenModal(estado);
  }

  useEffect(() => {
    ApiProveedores()
    const result = searchByName(proveedorFake, searchValue);
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
            <H5>Proveedor</H5>
          </FlexBox>
          <SearchInput bordered={'true'} placeholder="Buscar proveedores" onChange={e => setSearchValue(e.target.value)} />
          <Button
            variant="contained"
            endIcon={<Add />}
            onClick={async () => { await OpenModal(true) }}>
            {t("Añadir Proveedor")}
          </Button>
        </HeadingWrapper>
        <CustomTable columnShape={ProveedorColumns} data={filteredItem} />
        <CreateProveedorModal open={openModal} onClose={() => OpenModal(false)} editProveedor={true} id={0}/>
      </Box>
    </Context.Provider>
  );
};

export default ProveedorList;