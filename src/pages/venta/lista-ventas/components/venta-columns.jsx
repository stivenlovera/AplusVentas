import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Delete from "icons/Delete";
import { Small } from "components/Typography";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ProcesarPagoVentaModal from "pages/venta/create-venta/components/ProcesarPagoModal/ProcesarPagoModal";
import { UseCotizacion } from "pages/venta/create-venta/hooks/useCotizacion";
import { initialCotizacion } from "pages/venta/create-venta/utils/fakeVenta";
import { Link } from "react-router-dom";
const VentaColumns = [
    {
        Header: "codigo venta",
        accessor: "codigoVenta"
    },
    {
        Header: "Fecha",
        accessor: "fechaCreacion"
    },
    {
        Header: "Cliente",
        accessor: "nombreCompleto"
    },
    {
        Header: "Estado",
        accessor: "nombreEstadoVenta",
        Cell: ({
            row
        }) => {
            return (
                <Small
                    sx={{
                        backgroundColor: "action.hover",
                        borderRadius: 10,
                        padding: ".2rem 1rem",
                        textAlign: "center"
                    }}
                >
                    {row.original.nombreEstadoVenta}
                </Small>
            )
        }
    },
    {
        Header: "Tipo pago",
        accessor: "nombreAsiento"
    },
    {
        Header: "Precio total",
        accessor: "precioTotal"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [viewPreviewPago, setViewPreviewPago] = useState(initialCotizacion);
            const [modalPreview, setmodalPreview] = useState(false)
            const { PreviewPago } = UseCotizacion();

            const onPreviewPago = async () => {
                const { venta, status } = await PreviewPago(row.original.id);
                console.log('data de venta', venta)
                setmodalPreview(true)
                setViewPreviewPago(venta);
            }

            const [openModalEliminar, setOpenModalEliminar] = useState(false);
            /*Modal recibir producto */
            return (
                <Fragment>
                    <IconButton onClick={() => onPreviewPago()}>
                        <PointOfSaleIcon sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                    <IconButton onClick={() => { }}>
                        <VisibilityIcon sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                    <Link to={`/dashboard/venta-create/${row.original.id}`}>
                        <Edit sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </Link>
                    <IconButton onClick={() => setOpenModalEliminar(true)}>
                        <Delete sx={style} />
                    </IconButton>
                    <ProcesarPagoVentaModal
                        open={modalPreview}
                        data={viewPreviewPago}
                        onClose={() => { setmodalPreview(false) }}
                    />
                </Fragment>
            );
        }
    }];
export default VentaColumns;