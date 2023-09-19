import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Card, Slider, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // styled components

const Dot = styled(Box)(({
    theme,
    active
}) => ({
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginRight: 8,
    backgroundColor: active ? theme.palette.primary.main : theme.palette.text.secondary
}));
const CountWrapper = styled(Box)(({
    theme
}) => ({
    width: 33,
    height: 18,
    display: "flex",
    alignItems: "center",
    borderRadius: "10px",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.action.selected
}));

const SlideFilter = ({
    categorias,
    activeCategory,
    onActiveCategory,
    sort,
    activeSortBy,
    onActiveSortBy
}) => {
    const {
        t
    } = useTranslation();
    return <Card sx={{
        padding: 2
    }}>
        <Box>
            <H6>{t("Categorias")}</H6>
            {categorias.map(categoria =>
                <FlexBox key={categoria.categoriaId}
                    alignItems="center"
                    justifyContent="space-between"
                    marginTop={2}
                    onClick={() => onActiveCategory(categoria)}
                    sx={{
                        cursor: "pointer",
                        color: activeCategory === categoria ? "primary.main" : "text.secondary"
                    }}>
                    <FlexBox alignItems="center">
                        <Dot active={activeCategory === categoria.nombre} />
                        <Small>{t(categoria.nombre)}</Small>
                    </FlexBox>
                    <CountWrapper>
                        <Small>{1}</Small>
                    </CountWrapper>
                </FlexBox>)}
        </Box>

        <Box marginTop={4}>
            <H6>{t("Ordenar por")}</H6>
            {sort.map((item, i) =>
                <FlexBox key={i}
                    alignItems="center"
                    marginTop={2}
                    onClick={() => onActiveSortBy(item)}
                    sx={{
                        cursor: "pointer",
                        color: activeSortBy === item ? "primary.main" : "text.secondary"
                    }}>
                    <Dot active={activeSortBy === item.nombre} />
                    <Small>{t(item.nombre)}</Small>
                </FlexBox>)}
        </Box>
        <Button variant="contained" fullWidth sx={{
            marginTop: 4
        }}>
            Ver carrito
            <ShoppingCart sx={{
                fontSize: 17,
                marginLeft: 1
            }} />
        </Button>
    </Card>;
};

export default SlideFilter;