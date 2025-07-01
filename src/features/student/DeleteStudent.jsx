import { IconButton } from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDeleteStudentMutation } from "../../../api/studentApi.jsx";
import toast from "react-hot-toast";

const DeleteStudent = ({ id }) => {
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;
  const [deleteStudent, { isLoading }] = useDeleteStudentMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteStudent({ token, id }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.data || "Error while deleting Student"
      );
    }
  };

  return (
    <IconButton
      className="cursor-pointer"
      size="sm"
      onClick={() => handleDelete(id)}
      color="pink"
    >
      <AiOutlineDelete size="20px" />
    </IconButton>
  );
};

export default DeleteStudent;
