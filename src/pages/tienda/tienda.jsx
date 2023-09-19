import { Box, Button, ButtonBase, Grid, IconButton, Snackbar, Stack, styled } from "@mui/material";
import SearchInput from "components/input-fields/SearchInput";
import { StyledPagination } from "page-sections/data-table/dataTableV2/styledComponents";
import { forwardRef, useEffect, useState } from "react";
import { searchByName } from "utils/utils"; // styled components
import SlideFilter from "./components/slide-filter";
import CardProducto from "./components/card-producto";
import ModalDetailProducto from "./components/modal-detail-product";
import { UseProducto } from "pages/productos/hooks/useProducto";
import { UseClasificacion } from "pages/Clasificacion/hooks/useClasificacion";
import MuiAlert from '@mui/material/Alert';
import sortArray from 'sort-array'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Tienda = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItem, setFilteredItem] = useState(productList);
  const [productos, setProductos] = useState([]);
  //ordered
  const [categorias, setCategorias] = useState([])
  const [activeCategory, setActiveCategory] = useState({
    nombre: 'Nombre',
    column: 'nombre',
    order: 'asc'
  });
  const [sort, setSort] = useState([{
    nombre: 'Nombre',
    column: 'nombre',
    order: 'asc'
  },
  {
    nombre: 'De mayor a menor precio',
    column: 'precioVentaMax',
    order: 'desc'
  },
  {
    nombre: 'De menor a mayor precio',
    column: 'precioVentaMax',
    order: 'asc'
  }])
  const [activeSortBy, setActiveSortBy] = useState("");

  const { List } = UseProducto();
  const { onList } = UseClasificacion();

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
  const AddCarrttoCompra = (producto) => {
    console.log(producto)
    handleClick()
  }
  useEffect(() => {
    const result = searchByName(productList, searchValue);

    setFilteredItem(result);
    inizialize()
  }, [searchValue]);
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
  return <Box pt={2} pb={4}>
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Añadido al carrto de compra
      </Alert>
    </Snackbar>
    <SearchInput bordered={false} placeholder="Find Products" onChange={e => setSearchValue(e.target.value)} />
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
          />
        </Grid>
        <Grid item lg={9} sm={8} xs={12}>
          <Grid container spacing={3}>
            {productos.map(producto => <Grid item lg={4} md={6} xs={12} key={producto.id}>
              <CardProducto
                product={producto}
                handleClick={() => setOpenModal(true)}
                onAddProducto={AddCarrttoCompra}
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
    <ModalDetailProducto onClose={() => { setOpenModal(false) }} openModal={openModal} />
  </Box>;
};

const productList = [{
  productoId: 1,
  codigoProducto: 'prod-1',
  codigoBarra: '554521222112',
  nombreProducto: 'RT53K6541SL',
  stockActual: 0,
  precioCompra: 1000,
  utilidadMin: 20,
  precioVentaMin: 4200,
  utilidadMax: 40,
  precioVentaMax: 4900,
  categoria: null,
  productoMaestro: null,
  productoMaestroNombre: null,
  imagenes: null,
  atributos: []
}];
export default Tienda;