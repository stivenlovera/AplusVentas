import { GetProductsService } from "Services/api-ventas-erp/almacenes";
import { Request } from "utils/http";
export const UseAlmacen = () => {

    const GetProductosAlmacen = async (id) =>{

        const { data, message, status } = await Request({
            endPoint: GetProductsService(id),
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        console.log(data)
        console.log(message)
        console.log(status)
        return {
            store: data,
            status: !!status
          };
    }

      return {
        GetProductosAlmacen
      };
      

}