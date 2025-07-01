import { useSelector } from "react-redux";
import AdminPanel from "./admin/AdminPanel.jsx";
import Profile from "./Profile.jsx";
import LoginPage from "./LoginPage.jsx";

const Dashboard = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div>
      {user?.role === "admin" ? (
        <AdminPanel />
      ) : user?.role === "user" ? (
        <Profile />
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
