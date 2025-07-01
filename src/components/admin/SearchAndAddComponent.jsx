import { Button, Input } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";

const SearchAndAddComponent = () => {
  const navigate = useNavigate();
  const searchRef = useRef("");
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const search = searchParams.get("search");
    if (!search && searchRef.current) {
      searchRef.current.value = "";
    }
  }, [searchParams]);

  const handleSearch = () => {
    const value = searchRef.current?.value.trim();
    console.log(value);
    setSearchParams({ search: value });
  };
  return (
    <div className=" flex  justify-between w-full p-4">
      <div className="flex gap-4">
        <div className="w-[350px]">
          <Input
            label="Search student by name, email or course"
            inputRef={searchRef}
          />
        </div>
        <Button className="cursor-pointer bg-[#2A6047] " onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div>
        <Button
          onClick={() => navigate("/addstudent")}
          className="cursor-pointer"
          style={{ backgroundColor: "#2A6047", color: "#fff" }}
        >
          Add New Student
        </Button>
      </div>
    </div>
  );
};

export default SearchAndAddComponent;
