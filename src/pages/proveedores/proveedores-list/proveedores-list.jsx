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
import { proveedorInitial } from "./components/proveedor-fake";
import { UseProveedor } from "./hooks/useProveedor";
import { Context } from "contexts/ContextDataTable";

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
  const [actualizarTable, setActualizarTableContext] = useState(true);

  const [openModal, setOpenModal] = useState(false); // search input
  const [loadDataTable, setLoadDataTable] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState([]);
  const [data, setData] = useState(proveedorInitial)

  const { List, Store, Create } = UseProveedor()

  //API
  const ApiProveedores = async () => {
    const { lista, status } = await List()
    if (status) {
      setFilteredItem(lista)
    }
  }
  const ApiCreate = async () => {
    const { create, status } = await Create()
    if (status) {
      setData({ ...data, codigoProveedor: create.codigo, planCuentaId: 0 });
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }
  const ApiStore = async (values) => {
    const { store, status } = await Store(values)
    if (status) {
      setOpenModal(false);
      ApiProveedores()
    } else {
      setOpenModal(true);
    }
  }
  //METODOS

  const onCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    if (actualizarTable) {
      ApiProveedores()
      setActualizarTableContext(false)
    }

  }, [actualizarTable]);
  
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
            onClick={ApiCreate}>
            {t("Añadir Proveedor")}
          </Button>
        </HeadingWrapper>
        <CustomTable columnShape={ProveedorColumns} data={filteredItem} />
        <CreateProveedorModal
          open={openModal}
          data={data}
          onClose={onCloseModal}
          editProveedor={false}
          onSubmit={ApiStore}
        />
      </Box>
    </Context.Provider>
  );
};

export default ProveedorList;