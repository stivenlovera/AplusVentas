import styled from '@emotion/styled'
import { Button, Card, Grid, useMediaQuery } from '@mui/material'
import AppModal from 'components/AppModal'
import Scrollbar from 'components/ScrollBar'
import { H2, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import React from 'react'

const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 500,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));

const ModalDelete = ({
    open,
    data,
    onClose,
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
        <StyledAppModal open={open} handleClose={onClose} >
            <H2 marginBottom={2}>
                Eliminar
            </H2>
            <form onSubmit={onClose}>
                <Scrollbar style={{
                    maxHeight: downXl ? 500 : "auto"
                }}>
                    <Grid container spacing={3}>
                        <Grid item md={7} xs={12}>
                            <H6 mb={1}>Este proceso no se podra revertir</H6>
                        </Grid>
                    </Grid>
                </Scrollbar>
                <Grid container>
                    <Grid item xs={12}>
                        <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                            <Button fullWidth variant="outlined" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button color='error' fullWidth type="submit" variant="contained" >
                                Eliminar
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </form>
        </StyledAppModal >
    )
}

export default ModalDelete
