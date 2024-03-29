import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/login',
    children,
  }) => {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };