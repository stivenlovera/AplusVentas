import React, { useState } from 'react'
import Homologar from '../homologar/homologar'
import { H2 } from 'components/Typography'
import AppModal from 'components/AppModal';
import styled from '@emotion/styled';
import { Box, Grid, colors, useMediaQuery } from '@mui/material';
import Scrollbar from 'components/ScrollBar';
import LayoutBodyWrapper from 'layouts/layout-parts/LayoutBodyWrapper';
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));
const ModalHomologar = ({
    productoId,
    open,
    onClose
}) => {

    const [sidebarCompact, setSidebarCompact] = useState(false);
    const customStyle = {
        width: `calc(100% - ${sidebarCompact ? "86px" : "280px"})`,
        marginLeft: sidebarCompact ? "86px" : "280px"
    };
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
        <StyledAppModal open={open} handleClose={onClose}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={0} sx={{ background: '#F3F4F9' }}>
                    <Grid item sm={12} md={12} xs={12} sx={{ p: 2 }}>
                        <Homologar
                            productoId={productoId} />
                    </Grid>
                </Grid>
            </Scrollbar>

        </StyledAppModal>
    )
}

export default ModalHomologar
