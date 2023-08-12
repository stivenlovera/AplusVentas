import { Request } from "utils/http";

export const UseGeneral = () => {
  const onEditar = async (id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/general/editar`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    return {
      edit: data,
      status: !!status
    };
  }
  const onUpdate = async (values) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/general/${values.id}`,
      initialValues: [],
      method: 'put',
      showError: true,
      showSuccess: true,
      values: values
    });
    return {
      update: data,
      status: !!status
    };
  }
  return {
    onEditar,
    onUpdate
  }
}