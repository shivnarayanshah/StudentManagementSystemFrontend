import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent.jsx";
import PaginatedStudentsList from "../student/PaginatedStudentsList.jsx";
import StudentList from "../student/StudentList.jsx";
const AdminPanel = () => {
  return (
    <div className="">
      <SearchAndAddComponent />
      {/* <StudentList /> */}
      <PaginatedStudentsList />
    </div>
  );
};

export default AdminPanel;
