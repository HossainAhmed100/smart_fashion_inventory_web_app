import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Tooltip
} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {capitalize} from "./utils";
import { FiPlus } from "react-icons/fi";
import DateRangePicker from "../../components/Modal/DateRangePicker";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";

const statusColorMap = {paid: "success", due: "danger"};

const columns = [
  {name: "EXPENSE ID", uid: "itemNo"},
  {name: "EXPENSE DATE", uid: "expense_date"},
  {name: "EXPENSE TAG", uid: "expense_factoryName"},
  {name: "EXPENSE DESCRIPTION", uid: "expense_desceiption"},
  {name: "PAYMENT STATUS", uid: "expense_status"},
  {name: "AMOUNT", uid: "expense_amount", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [{name: "Expense Amount Paid", uid: "paid"},{name: "Expense Amount Due", uid: "due"}];

const INITIAL_VISIBLE_COLUMNS = ["itemNo", "expense_date", "expense_factoryName", "expense_desceiption", "expense_amount", "expense_status", "actions"];

const reportData = [
  {
     "_id": "feo8698608470h8394", 
     "itemNo": "878972", 
     "expense_date": "2024-05-16", 
     "expense_factoryName": "Embroidery", 
     "expense_desceiption": "Niddle 1,000 Pcs", 
     "expense_amount": "2,340", 
     "expense_status": "paid",
  },
  {
     "_id": "feo8698808470h8394", 
     "itemNo": "878072", 
     "expense_date": "2024-05-26", 
     "expense_factoryName": "Printing", 
     "expense_desceiption": "Stauff Coffee 20 Cup", 
     "expense_amount": "2,340", 
     "expense_status": "due",
  },
  {
     "_id": "feo8698908470h8394", 
     "itemNo": "878173", 
     "expense_date": "2024-05-30", 
     "expense_factoryName": "Sewing", 
     "expense_desceiption": "Thread 5,000 m", 
     "expense_amount": "1,500", 
     "expense_status": "paid",
  },
  {
     "_id": "feo8699008470h8394", 
     "itemNo": "878274", 
     "expense_date": "2024-06-01", 
     "expense_factoryName": "Finishing", 
     "expense_desceiption": "Buttons 2,000 Pcs", 
     "expense_amount": "700", 
     "expense_status": "due",
  },
  {
     "_id": "feo8699108470h8394", 
     "itemNo": "878375", 
     "expense_date": "2024-06-05", 
     "expense_factoryName": "Cutting", 
     "expense_desceiption": "Scissors 100 Pcs", 
     "expense_amount": "500", 
     "expense_status": "paid",
  },
  {
     "_id": "feo8699208470h8394", 
     "itemNo": "878476", 
     "expense_date": "2024-06-10", 
     "expense_factoryName": "Packaging", 
     "expense_desceiption": "Boxes 500 Pcs", 
     "expense_amount": "1,200", 
     "expense_status": "due",
  },
  {
     "_id": "feo8699308470h8394", 
     "itemNo": "878577", 
     "expense_date": "2024-06-12", 
     "expense_factoryName": "Design", 
     "expense_desceiption": "Design Software License", 
     "expense_amount": "3,000", 
     "expense_status": "paid",
  },
  {
     "_id": "feo8699408470h8394", 
     "itemNo": "878678", 
     "expense_date": "2024-06-15", 
     "expense_factoryName": "Quality Control", 
     "expense_desceiption": "Quality Test Equipment", 
     "expense_amount": "4,500", 
     "expense_status": "due",
  },
  {
     "_id": "feo8699508470h8394", 
     "itemNo": "878779", 
     "expense_date": "2024-06-18", 
     "expense_factoryName": "Logistics", 
     "expense_desceiption": "Transportation Fees", 
     "expense_amount": "2,800", 
     "expense_status": "paid",
  },
  {
     "_id": "feo8699608470h8394", 
     "itemNo": "878880", 
     "expense_date": "2024-06-20", 
     "expense_factoryName": "Marketing", 
     "expense_desceiption": "Advertising Campaign", 
     "expense_amount": "5,000", 
     "expense_status": "due",
  }
];


export default function ExpenseTracker() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const axiosPublic = useAxiosPublic();
  const [sortDescriptor, setSortDescriptor] = React.useState({column: "expense_amount",direction: "ascending",});
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

//   const {data: reportData = [], isLoading: isReportLoading} = useQuery({
//     queryKey: ["reportData"],
//     queryFn: async()=>{
//       const res = await axiosPublic.get("/reportData");
//       return res.data;
//     }
//   })

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...reportData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((data) =>
        data.expense_factoryName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((data) =>
        Array.from(statusFilter).includes(data.expense_status),
      );
    }

    return filteredUsers;
  }, [hasSearchFilter, filterValue, statusFilter]);

  const handleActins = () => {
    Swal.fire({
      title: "Notice",
      text: "This Project is under Development!",
      icon: "info"
    });
  }

  const addNewExpense = () => {
    Swal.fire({
      title: "Notice",
      text: "This Project is under Development!",
      icon: "info"
    });
  }
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "expense_date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "expense_desceiption":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "expense_amount":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {cellValue}</p>
          </div>
        );
      case "expense_status":
        return (
          <Chip className="capitalize" color={statusColorMap[item.expense_status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span onClick={handleActins} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <LuEye />
            </span>
          </Tooltip>
          <Tooltip content="Edit">
            <span onClick={handleActins} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <BiEditAlt />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete">
            <span onClick={handleActins} className="text-lg text-danger cursor-pointer active:opacity-50">
              <RiDeleteBinLine />
            </span>
          </Tooltip>
        </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by Style name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <DateRangePicker />
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button onClick={addNewExpense} color="primary" endContent={<FiPlus />}>
              Add New Expense
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {reportData.length} Data</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, onPreviousPage, onNextPage, pages]);

  return (
    <>
    <Helmet title='Expense Report | Mayer Doa Inventory'/>
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No Data found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
    </>
  );
}
