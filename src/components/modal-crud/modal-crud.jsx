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
/**
 * ModalCrud component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the modal.
 * @param {React.ReactNode} props.children - The content of the modal.
 * @param {boolean} props.open - Whether the modal is open or not.
 * @param {any} props.data - Additional data for the modal.
 * @param {Function} props.onClose - Callback function to handle modal close.
 * @param {Function} props.onAccept - Callback function to handle modal accept.
 * @param {boolean} props.disabledButton - Whether the button is disabled or not.
 * @returns {JSX.Element} The ModalCrud component.
 */
const ModalCrud = ({
    title,
    children,
    open,
    data,
    onClose,
    onAccept,
    disabledButton
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
        <StyledAppModal open={open} handleClose={onClose} >
            <H2 marginBottom={2}>
                {title ?? "titulo"}
            </H2>
            <form onSubmit={onClose}>
                <Scrollbar style={{
                    maxHeight: downXl ? 500 : "auto"
                }}>
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            {children}
                        </Grid>
                    </Grid>
                </Scrollbar>
                <Grid container>
                    <Grid item xs={12}>
                        <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                            <Button fullWidth variant="outlined" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button color='error' fullWidth variant="contained" disabled={disabledButton} onClick={() => { onAccept(data) }} >
                                Eliminar
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </form>
        </StyledAppModal >
    )
}

export default ModalCrud;