import { Button } from "@nextui-org/react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

function AddNewDataBtn() {
  return (
    <Button color="primary" endContent={<FiPlus />}>
      <Link to="/insertNewData" >
        Add New
      </Link>
    </Button>
  )
}

export default AddNewDataBtn
