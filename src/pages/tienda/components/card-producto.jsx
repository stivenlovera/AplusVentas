import { Add, Favorite, Star } from "@mui/icons-material";
import { alpha, Box, Card, IconButton, useTheme } from "@mui/material";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { H3, H5, Small, Tiny } from "components/Typography";
import ImagenNoDisponible from '../../../assets/no-dispnible.jpg'
const CardProducto = ({
    product,
    handleClick,
    onAddProducto
}) => {
    const theme = useTheme();
    const validateImagen = product.imagenes.length > 0 ? `${process.env.REACT_APP_IMAGENES_PRODUCTOS}/${product.imagenes[0]}` : ImagenNoDisponible;
    return <Card sx={{
        border: 0
    }}>
        <FlexRowAlign onClick={handleClick} sx={{
            cursor: "pointer",
            overflow: "hidden"
        }}>
            <img src={validateImagen} alt="Product" style={{
                objectFit: "cover",
                maxWidth: "100%"
            }} />
        </FlexRowAlign>

        <Box padding={1.5} bgcolor={theme.palette.mode === "dark" ? alpha("#fff", 0.03) : ""}>
            <FlexBox alignItems="flex-start" justifyContent="space-between">
                <Box>
                    <H5>{product.productoMaestroNombre}</H5>
                    <Tiny fontSize={12} color="text.disabled">
                        {product.nombreProducto}
                    </Tiny>
                </Box>
                <FlexBox alignItems="center" gap={0.5}>
                    <Small lineHeight={1} color="text.disabled">
                        {product.rating}
                    </Small>
                </FlexBox>
            </FlexBox>
            <FlexBetween>
                <H3>{product.precioVentaMax} Bs</H3>
                <Box>
                    <IconButton
                        sx={{
                            backgroundColor: "primary.main",
                            "&:hover": {
                                backgroundColor: "primary.main"
                            }
                        }}
                        onClick={() => { onAddProducto(product) }}
                    >
                        <Add fontSize="small" sx={{
                            color: "white"
                        }} />
                    </IconButton>
                </Box>
            </FlexBetween>
        </Box>
    </Card>;
};

export default CardProducto;