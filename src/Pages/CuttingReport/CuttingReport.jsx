import { useState, useMemo, useCallback } from "react";
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
} from "@nextui-org/react";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {capitalize} from "./utils";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import AddNewDataBtn from "../../components/Button/AddNewDataBtn";

const statusColorMap = {
  active: "primary",
  paused: "danger",
  complete: "success",
};

const columns = [
  {name: "ID", uid: "itemNo"},
  {name: "DATE", uid: "cutting_date"},
  {name: "CUT No.", uid: "cuttingNo", sortable: true},
  {name: "STYLE", uid: "styleName"},
  {name: "DESIGN", uid: "designName"},
  {name: "DETAILS", uid: "details"},
  {name: "QUANTITY", uid: "quantityPcs", sortable: true},
  {name: "CUT RATE", uid: "cutting_rate", sortable: true},
  {name: "TOTAL CUT RATE", uid: "total", sortable: true},
  {name: "FB WEIGHT", uid: "cutting_fabricsWeight", sortable: true},
  {name: "FB RATE", uid: "cutting_fabricsRate", sortable: true},
  {name: "FB COST (Pcs)", uid: "fabricsCostPerPcs", sortable: true},
  {name: "TOTAL COST (Pcs)", uid: "totalCostPerUnit", sortable: true},
  {name: "STATUS", uid: "cutting_status"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Complete", uid: "complete"},
];

const INITIAL_VISIBLE_COLUMNS = ["itemNo", "cutting_rate", "total", "cutting_fabricsWeight", "cutting_fabricsRate", "fabricsCostPerPcs", "totalCostPerUnit", "cutting_status"];

export default function CuttingReport() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const axiosPublic = useAxiosPublic();
  const [sortDescriptor, setSortDescriptor] = useState({column: "quantityPcs",direction: "ascending",});
  const [page, setPage] = useState(1);

  const {data: reportData = [], isLoading: isReportLoading} = useQuery({
    queryKey: ["reportData"],
    queryFn: async()=>{
      const res = await axiosPublic.get("/reportData");
      return res.data;
    }
  })

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredreportData = [...reportData];

    if (hasSearchFilter) {
      filteredreportData = filteredreportData.filter((item) =>
        item.styleName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredreportData = filteredreportData.filter((item) =>
        Array.from(statusFilter).includes(item.cutting_status),
      );
    }

    return filteredreportData;
  }, [hasSearchFilter, filterValue, statusFilter, reportData]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const commaSeperator = (num) => {
    const options = {  maximumFractionDigits: 2 };
    const total = Intl.NumberFormat("en-US",options).format(num);
    return total;
  }

  const rateCalculete = (rate, quantity) => {
    const num = rate * quantity;
    const options = {  maximumFractionDigits: 2 };
    const total = Intl.NumberFormat("en-US",options).format(num);
    return total;
  }

  const fabricCostPerPcs = (weight, rate, quantity) => {
      const totatFabricPrice = rate * weight;
      const perPcsPrice = totatFabricPrice / quantity;
      const result = parseFloat(perPcsPrice).toFixed(2);
      return result;
  }

  const totalCostPerUnit = (weight, rate, quantity, cuttingRate) => {
      const totatFabricPrice = rate * weight;
      const perPcsPrice = (totatFabricPrice / quantity) + parseFloat(cuttingRate);
      const result = parseFloat(perPcsPrice).toFixed(2);
      return result;
  }

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "cutting_date":
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
      case "quantityPcs":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue} Pcs</p>
          </div>
        );
      case "total":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {rateCalculete(item.cutting_rate, item.quantityPcs)}</p>
          </div>
        );
      case "cutting_rate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {cellValue}</p>
          </div>
        );
      case "cutting_fabricsWeight":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue} KG</p>
          </div>
        );
      case "cutting_fabricsRate":
        return (
          <div className="flex flex-col">
          <p className="text-bold text-small capitalize">
            Tk. {commaSeperator(cellValue)}
          </p>
          </div>
        );
      case "fabricsCostPerPcs":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {fabricCostPerPcs(item?.cutting_fabricsWeight, item?.cutting_fabricsRate, item?.quantityPcs)}</p>
          </div>
        );
      case "totalCostPerUnit":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">Tk. {totalCostPerUnit(item?.cutting_fabricsWeight, item?.cutting_fabricsRate, item?.quantityPcs, item?.cutting_rate)}</p>
          </div>
        );
      case "cutting_status":
        return (
          <Chip className="capitalize" color={statusColorMap[item.cutting_status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" aria-label="More options">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
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

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
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
  }, [selectedKeys, page, onPreviousPage, onNextPage, pages, filteredItems.length]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
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

