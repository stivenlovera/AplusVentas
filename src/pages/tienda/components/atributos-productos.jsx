import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Box, Rating, styled } from "@mui/material";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import { H5, Tiny } from "components/Typography";
import { Fragment, useState } from "react"; // styled component

const MuiAccordion = styled(Accordion)(() => ({
    marginTop: 10,
    "&:not(:last-child)": {
        borderBottom: 0
    },
    "&:before": {
        display: "none"
    },
    "&.Mui-expanded": {
        margin: 0,
        marginTop: 10
    }
}));

const AtributoProducto = ({
    descripcion,
    atributos
}) => {
    const [expanded, setExpanded] = useState("panel2");

    const handleExpand = panel => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return <Fragment>
        <MuiAccordion square disableGutters elevation={0} expanded={expanded === "panel1"} onChange={handleExpand("panel1")}>
            <AccordionSummary expandIcon={<ExpandMore color="disabled" />}>
                <H5>Descripción</H5>
            </AccordionSummary>
            <Tiny fontWeight={500} lineHeight={1.7} display="block">
                {descripcion}
            </Tiny>
        </MuiAccordion>

        <MuiAccordion expanded={expanded === "panel2"} onChange={handleExpand("panel2")}>
            <AccordionSummary expandIcon={<ExpandMore color="disabled" />}>
                <H5>Caracteriticas</H5>
            </AccordionSummary>
            <Box paddingTop={1}>
                {
                    atributos.map((atributo, i) => {
                        return (
                            <FlexBetween key={i}>
                                <FlexBox alignItems="center">
                                    <Tiny fontWeight={600} lineHeight={0.5} marginTop={1.5} display="block">
                                        nombre atributo
                                    </Tiny>
                                </FlexBox>
                                <Tiny fontWeight={500} lineHeight={0.5} marginTop={1.5} display="block">
                                    {atributo.valor}
                                </Tiny>
                            </FlexBetween>
                        )
                    })
                }

              {/*   <Tiny fontWeight={500} lineHeight={1.7} marginTop={1.5} display="block">
                    The shoe body is hard and needs to adapt to each other for a period
                    of time. I like it very much, I have to go a long way with it
                </Tiny> */}
            </Box>
        </MuiAccordion>
    </Fragment>;
};

export default AtributoProducto;