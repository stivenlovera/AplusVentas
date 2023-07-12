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
import { clienteListFake, initialStateCliente } from "./components/cliente-fake";
import { searchByName } from "./components/clientes-utils";
import { Context } from "./context/context";
import { UseCliente } from "../hooks/useCliente";
import { HeadingWrapper } from "pages/orden-compra/orden-compra-list/orden-compra-list";


const ClientesList = () => {
  const {
    t
  } = useTranslation();
  const [actualizarTable, setActualizarTableContext] = useState(false);
  const [openModal, setOpenModal] = useState(false); // search input
  const [create, setCreate] = useState(initialStateCliente)

  const { List, Create, Store } = UseCliente()

  const ApiClientes = async () => {
    const { data, status } = await List();
    if (status) {
      setFilteredItem(data);
    }
  }
  const onOpenCreate = async () => {
    await ApiCreate();
    setOpenModal(true);
  }

  const onOpenStore = async (values) => {
    await ApiStore(values);
    setOpenModal(false);
  }

  const ApiCreate = async () => {
    const { data, status } = await Create();
    if (status) {
      setCreate({ ...create, codigoCliente: data.codigoCliente })
    }
  }
  const ApiStore = async (values) => {
    const { data, status } = await Store(values);
    if (status) {
      console.log(status,'on close modal')
    }
  }
  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState(clienteListFake);
  useEffect(() => {
    ApiClientes()
    const result = searchByName(clienteListFake, searchValue);
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
          <Button variant="contained" endIcon={<Add />} onClick={onOpenCreate}>
            {t("Añadir cliente")}
          </Button>
        </HeadingWrapper>

        <CustomTable columnShape={ClienteColumns} data={filteredItem} />

        <CreateClienteModal open={openModal} onSubmit={onOpenStore} editCliente={false} onClose={() => setOpenModal(false)} data={create} />
      </Box>
    </Context.Provider>
  );
};

export default ClientesList;