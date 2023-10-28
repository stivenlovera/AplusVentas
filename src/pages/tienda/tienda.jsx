import { Box, Button, ButtonBase, Grid, IconButton, Snackbar, Stack, styled } from "@mui/material";
import SearchInput from "components/input-fields/SearchInput";
import { StyledPagination } from "page-sections/data-table/dataTableV2/styledComponents";
import { forwardRef, useContext, useEffect, useState } from "react";
import { searchByName } from "utils/utils"; // styled components
import SlideFilter from "./components/slide-filter";
import CardProducto from "./components/card-producto";
import ModalDetailProducto from "./components/modal-detail-product";
import { UseProducto } from "pages/productos/hooks/useProducto";
import { UseClasificacion } from "pages/Clasificacion/hooks/useClasificacion";
import MuiAlert from '@mui/material/Alert';
import sortArray from 'sort-array'
import { ContextCotizacion } from "contexts/ContextCotizacion";
import { initialStateDetalleProducto, initialStateSort } from "./utils/initialStates";
import ModalCarritoLista from "./components/modal-carrito-lista";
import { useCarritoCompra } from "./hooks/useCarritoCompra";
import { decrementaProducto, deleteProducto, incrementaProducto, verificarProductoRepetido } from "./utils/funciones";
import { UseCotizacion } from "pages/venta/create-venta/hooks/useCotizacion";
import { initialCotizacion } from "pages/venta/create-venta/utils/fakeVenta";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Tienda = () => {
  const [carritoProductos, setCarritoProductos] = useState([])
  const [openModalCarritoCompra, setOpenModalCarritoCompra] = useState(false);
  const [openModalDetalleProducto, setOpenModalDetalleProducto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [activeProducto, setActiveProducto] = useState(initialStateDetalleProducto);
  //ordered
  const [categorias, setCategorias] = useState([])
  const [activeCategory, setActiveCategory] = useState({
    nombre: 'Nombre',
    column: 'nombre',
    order: 'asc'
  });
  const [sort, setSort] = useState(initialStateSort)
  const [activeSortBy, setActiveSortBy] = useState("");

  const { List, Get } = UseProducto();
  const { onList } = UseClasificacion();
  const { Create, Store, PreviewPago, ProcesarPago, Editar, Update } = UseCotizacion()

  const StoreCotizacion = async (productos) => {

    const nuevosProductos = productos.map((producto) => {
      return {
        productoId: producto.productoId,
        cantidad: producto.cantidad,
        stock: producto.stock,
        codigoProducto: producto.codigoProducto,
        precioUnitario: producto.precioVentaMax,
        precioTotal: producto.precioVentaMax * producto.cantidad
      }
    })
    let nueva_cotizacion = initialCotizacion;
    nueva_cotizacion.productos = nuevosProductos;
    console.log(nueva_cotizacion)
    /* const { status, store } = await Store(values);
    if (status) {
        console.log(store)
    } */
  }

  const inizialize = async () => {
    const { lista, status } = await List();
    if (status) {
      setProductos(lista);
    }
    const { lista: listaCategoria, status: statusCategoria } = await onList();
    if (statusCategoria) {
      setCategorias(listaCategoria);
    }
  }
  const ordenar = (data) => {
    /* const categorias = sortArray(productos, { by: 'nombre', order: 'asc' }) */
    //console.log(categorias)
    const ordenar = sortArray(productos, { by: data.column, order: data.order });
    //console.log(ordenar)
    setActiveSortBy(data)
  }

  const decrementar = (carritoProductos, producto) => {
    const carrito = decrementaProducto(carritoProductos, producto);
    setCarritoProductos(carrito);
  }
  const incrementar = (carritoProductos, producto, stock) => {
    const carrito = incrementaProducto(carritoProductos, producto, stock);
    setCarritoProductos(carrito);
  }
  const deleteLista = (carritoProductos, producto) => {
    const carrito = deleteProducto(carritoProductos, producto);
    setCarritoProductos(carrito);
  }

  const AddCarritoCompra = (producto) => {
    const carritoVerificado = verificarProductoRepetido(carritoProductos, producto)
    setCarritoProductos(carritoVerificado)
    handleClick()
  }

  const onEditarProducto = async (productoId) => {
    const { edit, status } = await Get(productoId)
    if (status) {
      setActiveProducto(edit);
      setOpenModalDetalleProducto(true)
    }
  };

  //notistack
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  //useEffect
  useEffect(() => {
    inizialize()
  }, []);
  return <Box pt={2} pb={4}>
    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Añadido al carrto de compra
      </Alert>
    </Snackbar>
    <SearchInput bordered={false} placeholder="Buscar productos" onChange={() => { }} />
    <Box marginTop={3}>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={4} xs={12}>
          <SlideFilter
            categorias={categorias}
            activeCategory={activeCategory}
            onActiveCategory={(data) => { setActiveCategory(data) }}
            sort={sort}
            activeSortBy={activeSortBy}
            onActiveSortBy={ordenar}
            carritoCompra={carritoProductos}
            onOpenCarritoCompra={() => { setOpenModalCarritoCompra(true) }}
          />
        </Grid>
        <Grid item lg={9} sm={8} xs={12}>
          <Grid container spacing={3}>
            {productos.map(producto => <Grid item lg={4} md={6} xs={12} key={producto.productoId}>
              <CardProducto
                product={producto}
                handleClick={() => { onEditarProducto(producto.productoId) }}
                onAddProducto={AddCarritoCompra}
              />
            </Grid>)}
          </Grid>
          <Stack alignItems="center" marginTop={4}>
            <StyledPagination
              count={4}
              shape="rounded"
              onChange={(page, data) => { console.log('cambio', page, data) }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
    <ModalDetailProducto
      producto={activeProducto}
      onClose={() => { setOpenModalDetalleProducto(false); }}
      openModal={openModalDetalleProducto}
      onAddProducto={AddCarritoCompra}
    />
    <ModalCarritoLista
      openModalCarritoCompra={openModalCarritoCompra}
      carritoProductos={carritoProductos}
      onSaveCompra={StoreCotizacion}
      onCloseModalCarritoCompra={() => { setOpenModalCarritoCompra(false) }}
      onIncrement={(producto, stockActual) => { console.log(producto, stockActual, 'incrementar'); incrementar(carritoProductos, producto, stockActual) }}
      onDecrement={(producto) => { console.log(producto, 'decrementar'); decrementar(carritoProductos, producto) }}
      onDelete={(producto) => { deleteLista(carritoProductos, producto) }}
    />
  </Box>;
};

export default Tienda;