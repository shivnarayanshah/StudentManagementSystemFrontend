import { useSelector } from "react-redux";
import { useGetPaginatedStudentsQuery } from "../../../api/studentApi.jsx";
import { Button, Card, Typography } from "@material-tailwind/react";
import EditComponent from "../../components/admin/EditComponent.jsx";
import DeleteStudent from "./DeleteStudent.jsx";
import { useSearchParams } from "react-router";
import Pagination from "../../components/Pagination.jsx";

const TABLE_HEAD = [, "SN", "Name", "Email", "Age", "Courses", "Action"];

const PaginatedStudentsList = () => {
  const { user } = useSelector((state) => state.userSlice);
  const token = user.token;
  const [searchParams, setSearchParams] = useSearchParams(); //  usestate use garrda page refresh garnu bittikai page reset hunxa ani suru bata aauxa data so instead of usestate we use searchParams
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 10;
  const search = searchParams.get("search") || "";
  const { data, isLoading, error } = useGetPaginatedStudentsQuery({
    token,
    page,
    limit,
    search,
  });
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  const students = data?.students || [];

  if (isLoading) return <p className="text-center">loading....</p>;
  if (error) return <h1 className="text-center text-red-400">{error}</h1>;
  if (students.length <= 0) return <p className="text-center">No Data </p>;

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div>
        <Card className="h-full w-full overflow-scroll p-4">
          <table className="w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="  border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students?.map(({ _id, name, email, age, course }, index) => {
                const isLast = index === students?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {(currentPage - 1) * limit + index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {age}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {course}
                      </Typography>
                    </td>
                    <td className={(classes, "  flex gap-4 mt-4 mb-4")}>
                      <EditComponent id={_id} />
                      <DeleteStudent id={_id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="bg-[#2A6047]"
          disabled={page <= 1}
          onClick={() => setSearchParams({ page: page - 1 })}
          size="sm"
        >
          Prev
        </Button>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setSearchParams={setSearchParams}
        />

        <Button
          className="bg-[#2A6047]"
          disabled={page >= data?.totalPages}
          onClick={() => setSearchParams({ page: page + 1 })}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaginatedStudentsList;
