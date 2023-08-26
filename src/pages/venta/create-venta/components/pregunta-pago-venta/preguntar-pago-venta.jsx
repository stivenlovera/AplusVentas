import styled from '@emotion/styled';
import { Box, Button, Card, Divider, Grid, Stack, Table, TableBody, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import AppModal from 'components/AppModal';
import Scrollbar from 'components/ScrollBar';
import { H2, H3, H5, H6, Small, Span, Tiny } from 'components/Typography';
import FlexBox from 'components/flexbox/FlexBox';
import React from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

// styled components
const StyledSmall = styled(Small)(({
    theme,
    type
}) => ({
    fontSize: 12,
    color: "white",
    padding: "4px 10px",
    borderRadius: "4px",
    backgroundColor: type === "success" ? theme.palette.success.main : theme.palette.primary.main
}));
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 900,
    minWidth: 400,
    outline: "none",
    padding: "1.5rem"
}));
const ModalPreguntarPagoVenta = ({
    open,
    onClose,
    onPago
}) => {
    const navigate = useNavigate();
    const handlerNoProcesarPago = async () => {
        navigate('/dashboard/venta');
        return onClose;
    }
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
        <StyledAppModal open={open} handleClose={onClose} >
            <H2 marginBottom={2}>
                Desea procesar Venta
            </H2>
            <form onSubmit={(e) => { console.log(e) }}>
                <Scrollbar style={{
                    maxHeight: downXl ? 500 : "auto"
                }}>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                                Precione si o no.
                            </Typography>
                        </Grid>
                    </Grid>
                </Scrollbar>
                <Grid container>
                    <Grid item xs={12}>
                        <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                            <Button fullWidth variant="outlined" onClick={handlerNoProcesarPago}>
                                No
                            </Button>
                            <Button fullWidth type="button" variant="contained" onClick={onPago}>
                                Si
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </form>
        </StyledAppModal >
    )
}

export default ModalPreguntarPagoVenta;
