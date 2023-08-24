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
import { Link } from "react-router-dom";
import { Context } from "contexts/ContextDataTable";
import { preProcesarOrdenCompra, searchByOrdenCompra } from "./utils/ultils-orden-compra";
import { Request } from "utils/http";
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
  const [actualizarTable, setActualizarTableContext] = useState(true);
  const [listaOrdenCompra, setListaOrdenCompra] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  //API
  const onLoadLista = async () => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/orden-compra`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    if (!!status) {
      console.log('respuesta de la api', data)
      setListaOrdenCompra(preProcesarOrdenCompra(data));
    }
  }
  useEffect(() => {
    if (actualizarTable) {
      onLoadLista();
      setActualizarTableContext(false);
    } else {
      const result = searchByOrdenCompra(listaOrdenCompra, searchValue);
      setFilteredItem(result);
    }
  }, [searchValue, actualizarTable, listaOrdenCompra]);
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
      </Box>
    </Context.Provider>
  );
};

export default OrdenCompraList;