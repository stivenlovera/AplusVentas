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
import CreateCategoriaModal from "./components/create-categoria";
import CategoriaColumns from "./components/categoria-columns";
import { categoriaFake } from "./components/categoriaFake";
import { searchByName } from "./components/categoria-utils";
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

const CategoriaList = () => {
  const {
    t
  } = useTranslation();
  const [openModal, setOpenModal] = useState(false); // search input

  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState(categoriaFake);
  useEffect(() => {
    const result = searchByName(categoriaFake, searchValue);
    setFilteredItem(result);
  }, [searchValue]);
  return <Box pt={2} pb={4}>
    <HeadingWrapper justifyContent="space-between" alignItems="center">
      <FlexBox gap={0.5} alignItems="center">
        <IconWrapper>
          <ShoppingBasket sx={{
            color: "primary.main"
          }} />
        </IconWrapper>
        <H5>Categorias</H5>
      </FlexBox>
      <SearchInput bordered={'true'} placeholder="Buscar categorias" onChange={e => setSearchValue(e.target.value)} />
      <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
        {t("Añadir categoria")}
      </Button>
    </HeadingWrapper>

    <CustomTable columnShape={CategoriaColumns} data={filteredItem} />

    <CreateCategoriaModal open={openModal} onClose={() => setOpenModal(false)} />
  </Box>;
};

export default CategoriaList;