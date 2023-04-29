import { Add } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import SearchInput from "components/input-fields/SearchInput";
import { H5 } from "components/Typography";
import ShoppingBasket from "icons/ShoppingBasket";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateUsuarioModal from "./components/create-usuario";
import UsuarioColumns from "./components/usuario-columns";
import { usurioFake } from "./components/usuario-fake";
import { searchByNombre } from "./components/usuario-util";
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

const UsuarioList = () => {
    const {
        t
    } = useTranslation();
    const [openModal, setOpenModal] = useState(false); // search input

    const [searchValue, setSearchValue] = useState("");
    const [filteredItem, setFilteredItem] = useState(usurioFake);
    useEffect(() => {
        const result = searchByNombre(usurioFake, searchValue);
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
                <H5>Usuario</H5>
            </FlexBox>
            <SearchInput bordered={'true'} placeholder="Buscar usuario" onChange={e => setSearchValue(e.target.value)} />
            <Button variant="contained" endIcon={<Add />} onClick={() => setOpenModal(true)}>
                {t("Añadir Usuario")}
            </Button>
        </HeadingWrapper>

        <CustomTable columnShape={UsuarioColumns} data={filteredItem} />

        <CreateUsuarioModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>;
};

export default UsuarioList;