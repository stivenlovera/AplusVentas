import duotone from 'icons/duotone';
import { getAllRutas } from "utils/utils";
export const navigations = (user) => {
  const rutas = getAllRutas(user);
  const a = [
    {
      type: 'label',
      label: 'Dashboard'
    },
    {
      name: 'Tablero',
      path: '/dashboard',
      icon: duotone["PersonChalkboard"]
    },
    {
      type: 'label',
      label: 'Configuracion'
    },
    {
      name: 'Configuracion',
      path: '/dashboard/configuracion',
      icon: duotone["SettingsIcon"]
    },
    {
      type: 'label',
      label: 'General'
    },
    {
      name: 'Almacen',
      path: '/dashboard/almacenes-list',
      icon: duotone.LayerGroup
    },
    {
      name: 'Categorias',
      path: '/dashboard/categoria-list',
      icon: duotone.DataTable,
    },
    {
      name: 'Ingredientes',
      path: '/dashboard/ingredientes-list',
      icon: duotone.Invoice,
    },
    {
      name: 'Recetas',
      path: '/dashboard/recetas-list',
      icon: duotone.Invoice,
    },
    {
      name: 'Clasificacion',
      path: '/dashboard/clasificacion',
      icon: duotone.TodoList,
    },
    {
      name: 'Usuarios',
      path: '/dashboard/usuario-list',
      icon: duotone.UserProfile,
    },
    {
      name: 'Permisos y Roles',
      path: '/dashboard/roles-permisos',
      icon: duotone.RuleIcon,
    },
    {
      type: 'label',
      label: 'Compras'
    },
    {
      name: 'Orden de compra',
      path: '/dashboard/orden-compra-list',
      icon: duotone.TodoList,
    },
    {
      name: 'Proveedores',
      path: '/dashboard/proveedor-list',
      icon: duotone.CommentsQuestionCheck,
      badge: {
        value: '30'
      }
    },
    {
      type: 'label',
      label: 'Ventas'
    },
    {
      name: 'Cotizacion',
      path: '/dashboard/venta',
      icon: duotone.TodoList,
    },
    {
      name: 'Clientes',
      path: '/dashboard/cliente-list',
      icon: duotone.UserList,
    },
    {
      type: 'label',
      label: 'Contabilidad'
    },
    {
      name: 'Movimientos',
      path: '/dashboard/movimientos',
      icon: duotone.CurrencyExchangeIcon,
    },
    {
      name: 'Plan cuentas',
      path: '/dashboard/saas',
      icon: duotone.TodoList,
    },
  ].filter((item) => item.icon == null || rutas.includes(item.path.split('/dashboard/')[1]) || item.path === '/dashboard');
  return a;
}

