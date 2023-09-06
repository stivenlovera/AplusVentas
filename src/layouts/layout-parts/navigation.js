import duotone from 'icons/duotone';

export const navigations = [
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
    name: 'Productos',
    path: '/dashboard/productos-list',
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
];