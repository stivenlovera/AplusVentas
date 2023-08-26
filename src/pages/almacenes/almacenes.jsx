import { Box, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import AlmacenesList from "./almacenes-list/almacenes-list";
import AlmacenesListPendientes from "./almacenes-pendiente/almacen-pendiente";

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

const Almacenes = () => {
    console.log('components Almacenes');
    return (
        <Box pt={2} pb={4}>
            <AlmacenesList />
            <AlmacenesListPendientes />
        </Box>
    );
};

export default Almacenes;
