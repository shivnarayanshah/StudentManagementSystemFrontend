import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.userSlice);

  if (user) {
    return <Navigate to={"/"} replace={true} />;
  }

  return children;
};

export default PublicRoute;
