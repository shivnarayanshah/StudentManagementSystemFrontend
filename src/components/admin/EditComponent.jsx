import { IconButton } from "@material-tailwind/react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
const EditComponent = ({ id }) => {
  const navigate = useNavigate();
  return (
    <IconButton
      className="cursor-pointer"
      size="sm"
      onClick={() => navigate(`/edit/${id}`)}
      style={{ backgroundColor: "#2A6047" }}
    >
      <FaEdit size="20px" />
    </IconButton>
  );
};

export default EditComponent;
