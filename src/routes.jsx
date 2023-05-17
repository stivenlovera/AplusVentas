import LoadingScreen from "components/LoadingScreen";
import useSettings from "hooks/useSettings";
import DashboardLayoutV3 from "layouts/layout-v3/DashboardLayout";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = Component => props => {
  return <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>;
}; // dashboards
const AlmacenesList = Loadable(lazy(() => import("./pages/almacenes/almacenes-list/almacenes-list")));
const ProductosList = Loadable(lazy(() => import("./pages/productos/productos-list/productos-list")));
const CategoriaList = Loadable(lazy(() => import("./pages/categorias/categorias-list/categoria-list")));
const UsuarioList = Loadable(lazy(() => import("./pages/usuarios/usuario-list/usuario-list")));
const ProveedorList = Loadable(lazy(() => import("./pages/proveedores/proveedores-list/proveedores-list")));
const ClientesList = Loadable(lazy(() => import("./pages/clientes/clientes-list/clientes-list")));
const OrdenCompraList = Loadable(lazy(() => import("./pages/orden-compra/orden-compra-list/orden-compra-list")));
const ClasificacionList = Loadable(lazy(() => import("./pages/Clasificacion/clasificacion-list/clasificacion-list")));
const CreateOrden = Loadable(lazy(() => import("./pages/orden-compra/create-orden/create-orden")));
const PaginaInicial = Loadable(lazy(() => import("./pages/pagina-inicial/pagina-inicial")));
const Configuracion = Loadable(lazy(() => import("./pages/configuracion-inicial/configuracion/configuracion")));

const LearningManagement = Loadable(lazy(() => import("./pages/dashboards/learning-management"))); // account
const CreateOrdenInicial = Loadable(lazy(() => import("./pages/orden-compra/create-orden-inicial/create-orden-inicial")));
const Venta = Loadable(lazy(() => import("./pages/venta/lista-ventas/list-venta")));
const VentaCreate = Loadable(lazy(() => import("./pages/venta/create-venta/create-venta")));
const Login = Loadable(lazy(() => import("./pages/authentication/login")));

const Error = Loadable(lazy(() => import("./pages/404")));

const ActiveLayout = () => {
  const {
    settings
  } = useSettings(); // console.log(settings);

  return (<DashboardLayoutV3 />);
};

const routes = () => {
  return [...authRoutes, {
    path: "dashboard",
    element: <ActiveLayout />,
    children: dashboardRoutes
  }, {
    path: "*",
    element: <Error />
  }];
};

const authRoutes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />
  }, {
    path: "login",
    element: <Login />
  }
];
const dashboardRoutes = [
  {
    path: "",
    element: <LearningManagement />
  },
  {
    path: "almacenes-list",
    element: <AlmacenesList />
  },
  {
    path: "productos-list",
    element: <ProductosList />
  },
  {
    path: "categoria-list",
    element: <CategoriaList />
  },
  {
    path: "usuario-list",
    element: <UsuarioList />
  },
  {
    path: "proveedor-list",
    element: <ProveedorList />
  },
  {
    path: "cliente-list",
    element: <ClientesList />
  },
  {
    path: "orden-compra-list",
    element: <OrdenCompraList />
  },
  {
    path: "orden-compra-list/create",
    element: <CreateOrden />
  },
  {
    path: "clasificacion",
    element: <ClasificacionList />
  },
  {
    path: "configuracion",
    element: <Configuracion />
  },
  {
    path: "configuracion-inicial",
    element: <PaginaInicial />
  },
  {
    path: "orden-inicial/:id",
    element: <CreateOrdenInicial />
  },
  {
    path: "venta",
    element: <Venta />
  },
  {
    path: "venta-create/:id",
    element: <VentaCreate />
  },
  /* {
    path: "plan-cuentas",
    element: <Sales />
  } */
];
export default routes;