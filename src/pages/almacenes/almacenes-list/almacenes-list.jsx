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
import AlamacenesColumns from "./components/AlmacenesColumns";
import CreateAlmacenModal from "./components/CreateAlmacen";
import { almacenFake } from "./components/fake";
import { searchByName } from "./components/utils-almacenes";
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

const AlmacenesList = () => {
  const {
    t
  } = useTranslation();
  const [openModal, setOpenModal] = useState(false); // search input

  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState(almacenFake);
  useEffect(() => {
    const result = searchByName(almacenFake, searchValue);
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
        <H5>Almacen</H5>
      </FlexBox>
      <SearchInput bordered={'true'} placeholder="Buscar almacenes" onChange={e => setSearchValue(e.target.value)} />
      <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
        {t("Añadir Almacen")}
      </Button>
    </HeadingWrapper>

    <CustomTable columnShape={AlamacenesColumns} data={filteredItem} />

    <CreateAlmacenModal open={openModal} onClose={() => setOpenModal(false)} />
  </Box>;
};

export default AlmacenesList;