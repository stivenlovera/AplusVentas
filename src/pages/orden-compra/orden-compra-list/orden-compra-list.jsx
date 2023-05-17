import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { H5 } from "components/Typography";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import OrdenCompraColumns from "./components/orden-compra-columns";
import { searchByName } from "./components/orden-compra-utils";
import CreateOrdenCompraModal from "./components/create-orden-compra";
import { ordenCompraFake } from "./components/orden-compra-fake";
import { Link } from "react-router-dom";
import { UseListaOrdenCompra } from "./hooks/useListaOrdenCompra";
import { Context } from "contexts/ContextDataTable";
import RecibirProducto from "../recibir/recibir-producto";
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

const OrdenCompraList = () => {
  const {
    t
  } = useTranslation();
  const [openModal, setOpenModal] = useState(false); // search input

  const [actualizarTable, setActualizarTableContext] = useState(false);
  const { filter, filteredItem, listar, searchValue, setSearchValue, setFilteredItem, ApiListaOrdenCompra } = UseListaOrdenCompra();

  const onLoad = async () => {
    await ApiListaOrdenCompra();
  }
  useEffect(() => {
    onLoad()
  }, [searchValue]);
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
            <H5>Orden compras</H5>
          </FlexBox>
          <SearchInput bordered={'true'} placeholder="Buscar ordenes" onChange={e => setSearchValue(e.target.value)} />
          <Link to={'/dashboard/orden-inicial/create'}>
            <Button variant="contained" endIcon={<Add />} >
              {t("Añadir orden compra")}
            </Button>
          </Link>

        </HeadingWrapper>
              
        <CustomTable columnShape={OrdenCompraColumns} data={filteredItem} />
        <CreateOrdenCompraModal open={openModal} onClose={() => setOpenModal(false)} />
      </Box>
    </Context.Provider>
  );
};

export default OrdenCompraList;