import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const UserProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);

  if (!user || (user?.role !== "user" && user?.role !== "admin")) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
};

export default UserProtectedRoute;
