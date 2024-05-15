const columns = [
  {name: "ID", uid: "id"},
  {name: "DATE", uid: "date"},
  {name: "CUTTTING No.", uid: "cuttingNo", sortable: true},
  {name: "STYLE", uid: "styleName"},
  {name: "DESIGN", uid: "designName"},
  {name: "DETAILS", uid: "details"},
  {name: "QUANTITY", uid: "quantityPcs", sortable: true},
  {name: "REJECT", uid: "reject", sortable: true},
  {name: "RATE", uid: "rate", sortable: true},
  {name: "ACCESSORIES COST", uid: "accessoriesCost", sortable: true},
  {name: "TOTAL", uid: "total", sortable: true},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Complete", uid: "complete"},
];

const users = [
  {
    id: 1,
    rate: "31.0",
    reject: "2",
    date: "FEB-18",
    cuttingNo: "66",
    status: "active",
    quantityPcs: "492",
    accessoriesCost: "50.0",
    details: "Marsrize",
    designName: "J.G Embo",
    styleName: "Polo Shirt",
  },
  {
    id: 2,
    rate: "20.0",
    reject: "10",
    date: "FEB-19",
    cuttingNo: "67",
    status: "paused",
    quantityPcs: "510",
    accessoriesCost: "33.0",
    details: "Polister Slab",
    designName: "Saittu Sticker",
    styleName: "T-Shirt",
  },
  {
    id: 3,
    rate: "70.0",
    reject: "10",
    date: "FEB-20",
    cuttingNo: "68",
    status: "complete",
    quantityPcs: "498",
    accessoriesCost: "54.0",
    details: "Dalai",
    designName: "Jacket Neck",
    styleName: "Joggers",
  },
  {
    id: 4,
    rate: "50.0",
    reject: "10",
    date: "FEB-18",
    cuttingNo: "66",
    status: "active",
    quantityPcs: "494",
    accessoriesCost: "70.0",
    details: "Marsrize",
    designName: "J.G Embo",
    styleName: "Polo Shirt",
  },
  {
    id: 5,
    rate: "30.0",
    reject: "10",
    date: "FEB-19",
    cuttingNo: "67",
    status: "paused",
    quantityPcs: "510",
    accessoriesCost: "30.0",
    details: "Polister Slab",
    designName: "Saittu Sticker",
    styleName: "T-Shirt",
  },
  {
    id: 6,
    rate: "6.0",
    reject: "10",
    date: "FEB-20",
    cuttingNo: "68",
    status: "complete",
    quantityPcs: "498",
    accessoriesCost: "75.0",
    details: "Dalai",
    designName: "Jacket Neck",
    styleName: "Joggers",
  },
  {
    id: 7,
    rate: "50.0",
    reject: "10",
    date: "FEB-18",
    cuttingNo: "66",
    status: "active",
    quantityPcs: "494",
    accessoriesCost: "43.0",
    details: "Marsrize",
    designName: "J.G Embo",
    styleName: "Polo Shirt",
  },
  {
    id: 8,
    rate: "30.0",
    reject: "10",
    date: "FEB-19",
    cuttingNo: "67",
    status: "paused",
    quantityPcs: "510",
    accessoriesCost: "45.0",
    details: "Polister Slab",
    designName: "Saittu Sticker",
    styleName: "T-Shirt",
  },
  {
    id: 9,
    rate: "6.0",
    reject: "10",
    date: "FEB-20",
    cuttingNo: "68",
    status: "complete",
    quantityPcs: "498",
    accessoriesCost: "50.0",
    details: "Dalai",
    designName: "Jacket Neck",
    styleName: "Joggers",
  },
];

export {columns, users, statusOptions};
