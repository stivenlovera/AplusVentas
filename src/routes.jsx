import LoadingScreen from "components/LoadingScreen";
import { ContextUser } from "contexts/ContextUser";
import useSettings from "hooks/useSettings";
import DashboardLayoutV3 from "layouts/layout-v3/DashboardLayout";
import { element } from "prop-types";
import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "components/ProtectedRoute";
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
const AlmacenProducto = Loadable(lazy(() => import("./pages/almacenes/almacen-producto/almacen-producto")));
const Almacenes = Loadable(lazy(() => import("./pages/almacenes/almacenes")));
const Homologar = Loadable(lazy(() => import("./pages/almacenes/homologar/index")));


const LearningManagement = Loadable(lazy(() => import("./pages/dashboards/learning-management"))); // account
const CreateOrdenInicial = Loadable(lazy(() => import("./pages/orden-compra/create-orden-inicial/create-orden-inicial")));
const Venta = Loadable(lazy(() => import("./pages/venta/lista-ventas/list-venta")));
const VentaCreate = Loadable(lazy(() => import("./pages/venta/create-venta/create-venta")));
const PermisoList = Loadable(lazy(() => import("./pages/permisos-roles/list-permisos-roles")));
const Login = Loadable(lazy(() => import("./pages/login/login")));
const Movimientos = Loadable(lazy(() => import("./pages/movimientos/lista-movimientos2")));
const Error = Loadable(lazy(() => import("./pages/404")));

const ActiveLayout = ({ nombreCompleto }) => {
  const {
    settings
  } = useSettings(); // console.log(settings);

  const [userContext, setUserContext] = useState(nombreCompleto);

  useEffect(() => {
    setUserContext(nombreCompleto)
  }, [nombreCompleto])

  return (
    <ContextUser.Provider value={[userContext, setUserContext]}>
      <DashboardLayoutV3 />
    </ContextUser.Provider>
  );
};

const routes = (user, token) => {
  if (token) { // true si hay token
    return [
      {
        path: "dashboard",
        element: <ActiveLayout nombreCompleto={`${user.nombre} ${user.apellido}`} />,
        children: dashboardRoutes,
      },
      {
        path: "*",
        element: <Error />
      },
      {
        path: "/login",
        element: <Navigate to="/dashboard" />
      },
      {
        path: "",
        element: <Navigate to="/dashboard" />
      }];
  } else {
    return [
      ...authRoutes,
    ]
  }


};

const authRoutes = [
  {
    path: "/",
    element: <Navigate to="/login" />
  }, {
    path: "login",
    element: <Login />
  },
  {
    path: "*",
    element: <Navigate to="/login" />
  },
];

const dashboardRoutes = [
  {
    path: "",
    element: <LearningManagement />
  },
  {
    path: "almacenes-list",
    element: <Almacenes />
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
    path: "roles-permisos",
    element: <PermisoList />
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
    path: "orden-compra-list/editar/:id",
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
    path: "orden-inicial/editar/:id",
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
  {
    path: "movimientos",
    element: <ProtectedRoute isAllowed={false}><Movimientos /></ProtectedRoute>
  },
  {
    path: "almacen/:id",
    element: < AlmacenProducto />
  },
  {
    path: "almacen-homologar/:productoId",
    element: < Homologar />
  }
];
export default routes;