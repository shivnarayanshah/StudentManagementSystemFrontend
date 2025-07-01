import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);

  console.log(user);

  if (!user || user?.role !== "admin") {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default AdminProtectedRoute;
