import { Box, Button, ButtonBase, Grid, IconButton } from '@mui/material';
import FlexBetween from 'components/flexbox/FlexBetween';
import { CarouselProvider, Dot, Slide, Slider } from "pure-react-carousel";
import { Add, Favorite } from "@mui/icons-material";
import React, { useState } from 'react'
import styled from '@emotion/styled';
import AppModal from 'components/AppModal';
import { H3, H6 } from 'components/Typography';
import ModalAccordion from 'page-sections/ecommerce/ModalAccordion';

const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    [theme.breakpoints.down("sm")]: {
        maxHeight: 400,
        overflow: "auto"
    }
}));
const CustomButton = styled(ButtonBase)(({
    active,
    theme
}) => ({
    fontSize: 13,
    border: "none",
    fontWeight: 600,
    color: active === "true" ? theme.palette.primary.main : "inherit"
}));
const CustomDot = styled(Dot)(() => ({
    width: 80,
    height: 70,
    padding: 0,
    border: "none",
    overflow: "hidden"
}));

const ModalDetailProducto = ({
    openModal,
    onClose
}) => {
    const [activeSize, setActiveSize] = useState("Small"); // search input
    return (
        <StyledAppModal open={openModal} handleClose={onClose}>
            <Grid container spacing={3}>
                <Grid item sm={5} xs={12}>
                    <Box sx={{
                        "& .carousel .carousel__dot--selected": {
                            border: theme => `2px solid ${theme.palette.primary.main}`
                        }
                    }}>
                        <CarouselProvider totalSlides={3} naturalSlideWidth={100} naturalSlideHeight={115}>
                            <Slider style={{
                                marginBottom: 10
                            }}>
                                {[0, 1, 2].map(item => <Slide index={item} key={item}>
                                    <img alt="" width="100%" height="100%" src="/static/products/airbud-2.png" style={{
                                        objectFit: "cover"
                                    }} />
                                </Slide>)}
                            </Slider>

                            <FlexBetween>
                                {[0, 1, 2].map(item => <CustomDot slide={item} key={item}>
                                    <img alt="" width="100%" height="100%" src="/static/products/airbud-2.png" style={{
                                        objectFit: "cover"
                                    }} />
                                </CustomDot>)}
                            </FlexBetween>
                        </CarouselProvider>
                    </Box>
                </Grid>

                <Grid item sm={7} xs={12}>
                    <H3 mb={0.5}>Lamp Light</H3>
                    <H6 fontWeight={500} color="text.disabled">
                        Built for natural motion, the flex and motion
                    </H6>

                    <FlexBetween width={200} marginTop={2}>
                        <H6>Sizes:</H6>
                        {["Small", "Medium", "Big"].map(item => <CustomButton disableRipple key={item} onClick={() => setActiveSize(item)} active={(activeSize === item).toString()}>
                            {item}
                        </CustomButton>)}
                    </FlexBetween>

                    <H3 fontWeight={700} marginTop={2}>
                        $215
                    </H3>

                    <Box mt={1}>
                        <Button variant="contained" size="small" endIcon={<Add />}>
                            Add To Cart
                        </Button>
                        <IconButton sx={{
                            marginLeft: 1.5,
                            backgroundColor: "grey.100"
                        }}>
                            <Favorite sx={{
                                color: "text.disabled"
                            }} />
                        </IconButton>
                    </Box>

                    <Box marginTop={3}>
                        <ModalAccordion />
                    </Box>
                </Grid>
            </Grid>
        </StyledAppModal>
    )
}

export default ModalDetailProducto
