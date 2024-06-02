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
  Tooltip,
} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {capitalize} from "./utils";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AddNewDataBtn from "../../components/Button/AddNewDataBtn";
import DateRangePicker from "../../components/Modal/DateRangePicker";
import useDeleteReport from "../../hooks/useDeleteReport";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";


const statusColorMap = {
  active: "primary",
  paused: "danger",
  complete: "success",
};

const columns = [
  {name: "ID", uid: "itemNo"},
  {name: "DATE", uid: "finising_date"},
  {name: "STYLE", uid: "styleName"},
  {name: "DESIGN", uid: "designName"},
  {name: "DETAILS", uid: "details"},
  {name: "DESCRIPTION", uid: "description"},
  {name: "QUANTITY", uid: "quantityPcs", sortable: true},
  {name: "TOTAL REJECT", uid: "totalReject", sortable: true},
  {name: "RATE", uid: "finising_rate", sortable: true},
  {name: "TOTAL", uid: "total", sortable: true},
  {name: "TOTAL COST (Pcs)", uid: "totalCostPerPcs", sortable: true},
  {name: "STATUS", uid: "finising_status"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Complete", uid: "complete"},
];

const INITIAL_VISIBLE_COLUMNS = ["itemNo", "finising_date", "styleName", "totalReject", "quantityPcs", "rate", "total", "totalCostPerPcs", "finising_status", "actions"];

export default function FinishingReport() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const axiosPublic = useAxiosPublic();
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "quantityPcs",
    direction: "ascending",
  });
  const {data: reportData = [], isLoading: isReportLoading, refetch} = useQuery({
    queryKey: ["reportData"],
    queryFn: async()=>{
      const res = await axiosPublic.get("/reportData");
      return res.data;
    }
  })
  const handleDeleteReport = useDeleteReport(refetch);
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredreportData = [...reportData];

    if (hasSearchFilter) {
      filteredreportData = filteredreportData.filter((item) =>
        item.styleName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredreportData = filteredreportData.filter((item) =>
        Array.from(statusFilter).includes(item.finising_status),
      );
    }

    return filteredreportData;
  }, [hasSearchFilter, filterValue, statusFilter, reportData]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
  const totalCost = (finising_rate, quantity) => {
    const totalPrice = quantity * parseInt(finising_rate);
    const options = {  maximumFractionDigits: 2 };
    const total = Intl.NumberFormat("en-US",options).format(totalPrice);
    const result = total;
    return result;
  }

  const totalReject = (sewing_reject, printing_reject, embrodery_reject)=>{
    const rejectQuantity = [sewing_reject, printing_reject, embrodery_reject];
    const total = rejectQuantity.reduce((quantity, current) => quantity + parseFloat(current), 0);
    return total;
  }

  const totalCostPerPcs = (
    sewing_rate, 
    printing_rate, 
    embrodery_rate, 
    cutting_rate, 
    cutting_fabricsRate,
    cutting_fabricsWeight,
    sewing_accessoriesCost, 
    finising_rate,
    quantity)=>{

    const num = [
      sewing_rate, 
      printing_rate, 
      embrodery_rate, 
      sewing_accessoriesCost, 
      finising_rate,
      cutting_rate
    ];
    console.log("🚀 ~ FinishingReport ~ num:", num)

    const sum = num.reduce((rate, current) => rate + parseFloat(current), 0);
    const totatFabricPrice = cutting_fabricsRate * cutting_fabricsWeight;
    const perPcsPrice = totatFabricPrice / quantity;
    const total = sum + perPcsPrice;
    // console.log("🚀 ~ FinishingReport ~ total:", sum, perPcsPrice)
    const result = parseFloat(total).toFixed(2);
    return result;

  }

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
      case "finising_date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "cuttingNo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "styleName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "designName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "details":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "quantityPcs":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue} Pcs</p>
          </div>
        );
      case "totalReject":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{totalReject(item?.sewing_reject, item?.printing_reject, item?.embrodery_reject)} Pcs</p>
          </div>
        );
      case "finising_rate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {cellValue}</p>
          </div>
        );
      case "total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {totalCost(item.finising_rate, item.quantityPcs)}</p>
          </div>
        );
      case "totalCostPerPcs":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {totalCostPerPcs(
              item?.sewing_rate, 
              item?.printing_rate, 
              item?.embrodery_rate, 
              item?.cutting_rate,
              item?.cutting_fabricsRate,
              item?.cutting_fabricsWeight,
              item?.sewing_accessoriesCost, 
              item?.finising_rate,
              item?.quantityPcs)}</p>
          </div>
        );
      case "finising_status":
        return (
          <Chip className="capitalize" color={statusColorMap[item.finising_status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <Link to={`/viewSingleReport/${item?._id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <LuEye />
            </Link>
          </Tooltip>
          <Tooltip content="Edit">
            <Link to={`/editProject/${item?._id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <BiEditAlt />
            </Link>
          </Tooltip>
          <Tooltip color="danger" content="Delete">
            <span onClick={() => handleDeleteReport(item?._id)} className="text-lg text-danger cursor-pointer active:opacity-50">
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
            <AddNewDataBtn />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {reportData.length} Project</span>
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
    reportData
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
      <TableBody isLoading={isReportLoading} emptyContent={"No reportData found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
