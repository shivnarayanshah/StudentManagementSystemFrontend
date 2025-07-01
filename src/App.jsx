import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import Dashboard from "./features/Dashboard.jsx";
import RegisterPage from "./features/RegisterPage.jsx";
import LoginPage from "./features/LoginPage.jsx";
import Profile from "./features/Profile.jsx";
import AddStudent from "./features/student/AddStudent.jsx";
import UpdateStudent from "./features/student/UpdateStudent.jsx";
import StudentList from "./features/student/StudentList.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import UserProtectedRoute from "./components/UserProtectedRoute.jsx";
import PublicRoute from "./components/Publicroute.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/register",
          element: (
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          ),
        },

        {
          path: "/addstudent",
          element: (
            <AdminProtectedRoute>
              <AddStudent />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/edit/:id",
          element: (
            <AdminProtectedRoute>
              <UpdateStudent />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/all",
          element: (
            <AdminProtectedRoute>
              <StudentList />
            </AdminProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
