import { format } from "date-fns";
export const ordenCompraFake = [{
    id: 1,
    codigo: "demo",
    fecha: "almacen 1",
    estado: "bla bla",
    usuario: '75998955',
    proveedor: 'demo',
    codigoProducto: '0001',
    producto: 'demo',
    cantidad: '2',
    precioCompra:'demo@gail.com',
    totalCompra:'000000',
    almacenDestino: '???',
    facturado: '???',
    acciones: "",
}, {
    id: 2,
    codigo: "demo",
    fecha: "almacen 1",
    estado: "bla bla",
    usuario: '75998955',
    proveedor: 'demo',
    codigoProducto: '0001',
    producto: 'demo',
    cantidad: '2',
    precioCompra:'demo@gail.com',
    totalCompra:'000000',
    almacenDestino: '???',
    facturado: '???',
    acciones: "",
}];



export const ordersFakeData = [{
    orderNo: "UY3769",
    customer: "Mark Ruffle",
    date: format(new Date(), "dd-MM-yyyy"),
    total: "$789",
    payment: "Paypal",
    status: "Unpaid"
}, {
    orderNo: "UY3770",
    customer: "Mark Ruffle",
    date: format(new Date(), "dd-MM-yyyy"),
    total: "$789",
    payment: "Paypal",
    status: "Paid"
}, {
    orderNo: "UY3761",
    customer: "Mark Ruffle",
    date: format(new Date(), "dd-MM-yyyy"),
    total: "$789",
    payment: "Paypal",
    status: "Unpaid"
}, {
    orderNo: "UY3762",
    customer: "Mark Ruffle",
    date: format(new Date(), "dd-MM-yyyy"),
    total: "$789",
    payment: "Paypal",
    status: "Paid"
}];
export const customersFakeData = [{
    date: format(new Date(), "MMM dd, yyyy"),
    name: "Natalie Dormer",
    position: "UI Designer",
    phone: "+00578115245",
    avatar: "/static/avatar/001-man.svg",
    email: "Uilib@gmail.com",
    location: "Austin, USA",
    status: "Active"
}, {
    date: format(new Date(), "MMM dd, yyyy"),
    name: "Natalie Dormer",
    position: "Editor",
    phone: "+00578115245",
    avatar: "/static/avatar/002-girl.svg",
    email: "Uilib@gmail.com",
    location: "Austin, USA",
    status: "Blocked"
}, {
    date: format(new Date(), "MMM dd, yyyy"),
    name: "Lily Collins",
    position: "UI Designer",
    phone: "+00578115245",
    avatar: "/static/avatar/003-boy.svg",
    email: "Uilib@gmail.com",
    location: "Corner View, Sylhet",
    status: "Active"
}, {
    date: format(new Date(), "MMM dd, yyyy"),
    name: "Natalie Dormer",
    phone: "+00578115245",
    avatar: "/static/avatar/004-woman.svg",
    email: "Uilib@gmail.com",
    location: "Corner View, Sylhet",
    status: "Blocked"
}];