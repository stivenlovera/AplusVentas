import { Box, ButtonBase, Divider, Popover } from "@mui/material";
import { H4 } from "components/Typography";
import FlexBox from "components/flexbox/FlexBox";
import React from "react"; // component props interface
import { useNavigate } from "react-router-dom";
const OptionCarrito = props => {
  const navigate = useNavigate();
  const {
    children,
    popoverClose,
    popoverOpen,
    anchorRef,
    title,
    hiddenViewButton,
    minWidth,
    maxWidth
  } = props;
  return <Popover open={popoverOpen} onClose={popoverClose} anchorEl={anchorRef.current} anchorOrigin={{
    horizontal: "center",
    vertical: "bottom"
  }} PaperProps={{
    sx: {
      minWidth: minWidth || 250,
      maxWidth: maxWidth || 375,
      width: "100%",
      padding: "0.5rem 0"
    }
  }}>
    <H4 fontWeight="700" p={2}>
      {title || "Notifications"}
    </H4>
    <Divider />

    {children}

    {!hiddenViewButton && <Box p={2}>
      <FlexBox alignItems="center">
        <ButtonBase
          disableRipple
          onClick={() => {
            navigate("/dashboard/tienda");
          }}
          sx={{
            margin: "auto",
            display: "block",
            color: "primary.main"
          }}
        >
          Crear carrito
        </ButtonBase>
        <ButtonBase
          disableRipple
          onClick={() => {
            navigate("/dashboard/venta");
          }}
          sx={{
            margin: "auto",
            display: "block",
            color: "primary.main"
          }}
        >
          Ver todos
        </ButtonBase>
      </FlexBox>
    </Box>}
  </Popover>;
};

export default OptionCarrito;