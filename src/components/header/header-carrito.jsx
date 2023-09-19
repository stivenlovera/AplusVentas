import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Badge, Box, IconButton, styled, Tab, useTheme } from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import { H6, Paragraph, Tiny } from "components/Typography";
import { Fragment, useRef, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OptionCarrito from "./options-carrito";

const cotizaciones = [{
    id: "5e8883f1b51cc1956a5a1ec0",
    createdAt: Date.now(),
    title: "Your order is placed",
    type: "",
    name: "Brain Warner",
    message: "Changed an issue from in this project",
    image: "/static/avatar/001-man.svg"
  }, {
    id: "5e8883f7ed1486d665d8be1e",
    createdAt: Date.now(),
    description: "You have 32 unread messages",
    title: "New message received",
    type: "",
    name: "Kiara Hamptoon",
    message: "Nice Work! You really nailed it. Keep it Up Man",
    image: "/static/avatar/002-girl.svg"
  }, {
    id: "5e8883fca0e8612044248ecf",
    createdAt: Date.now(),
    description: "Dummy text",
    title: "Your item is shipped",
    type: "",
    name: "Ruby Walton",
    message: "Nice Work! You really nailed it. Keep it Up Man",
    image: "/static/avatar/004-woman.svg"
  }];
const StyledIconButton = styled(IconButton)(({
    theme
}) => ({
    "&:hover": {
        backgroundColor: theme.palette.action.hover
    }
}));
const StyledTab = styled(Tab)(() => ({
    width: "50%",
    marginLeft: 0,
    marginRight: 0
}));

const HeaderCarritoCompra = () => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState("1");

    const handleTabChange = (_, value) => {
        setTabValue(value);
    }; // unread cotizaciones


    const unreadMsg = cotizaciones.filter(item => item.type === "new_message");
    return <Fragment>
        <StyledIconButton ref={anchorRef} onClick={() => setOpen(true)}>
            <Badge color="error" badgeContent={0}>
                <ShoppingCartIcon sx={{
                    color: "text.disabled"
                }} />
            </Badge>
        </StyledIconButton>

        <OptionCarrito title="Carritos de compra" hiddenViewButton={cotizaciones.length === 0 ? true : false} popoverOpen={open} anchorRef={anchorRef} popoverClose={() => setOpen(false)}>
            <TabContext value={tabValue}>
                {cotizaciones.length === 0 ? <Paragraph fontWeight="500" textAlign="center" p={2}>
                    No exite carritos registrados
                </Paragraph> : <TabPanel value="1">
                    {cotizaciones.map(msg => <ListItem msg={msg} key={msg.id} />)}
                </TabPanel>}
            </TabContext>
        </OptionCarrito>
    </Fragment>;
}; // ListItem component props


function ListItem({
    msg
}) {
    const theme = useTheme();
    const colorbg = theme.palette.mode === "light" ? "secondary.light" : "divider";
    return <FlexBox p={2} alignItems="center" sx={{
        borderBottom: 1,
        cursor: "pointer",
        borderColor: "divider",
        backgroundColor: msg.type === "new_message" ? colorbg : "transparent",
        "&:hover": {
            backgroundColor: colorbg
        }
    }}>
        <FlexBox alignItems="center">
            <Box sx={{
                width: 8,
                height: 8,
                marginRight: 2,
                borderRadius: "50%",
                backgroundColor: msg.type === "new_message" ? "primary.main" : "text.disabled"
            }}
            />
            <AppAvatar src={msg.image} sx={{
                width: 35,
                height: 35
            }} />
        </FlexBox>

        <Box ml={2}>
            <H6>{msg.name}</H6>
            <Tiny display="block" fontWeight={500} color="text.disabled">
                {msg.message}
            </Tiny>
        </Box>
    </FlexBox>;
}

export default HeaderCarritoCompra;