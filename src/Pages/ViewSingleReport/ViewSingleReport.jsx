import { Chip } from "@nextui-org/react";
import { useLoaderData } from "react-router-dom"

const statusColorMap = {
  active: "primary",
  paused: "danger",
  complete: "success",
};

function ViewSingleReport() {
    const item = useLoaderData();
  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-3 md:grid-col-2 grid-cols-1 gap-4">
        <div className="p-6 rounded-lg border-1 border-gray-700">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white font-semibold text-lg">Project</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.entry_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Project ID:</h1>
            <h1 className="text-sm">#{item?.itemNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Entry Date:</h1>
            <h1 className="text-sm">{item?.entry_date}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Total Quantity:</h1>
            <h1 className="text-sm">{item?.quantityPcs}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Style Name:</h1>
            <h1 className="text-sm">{item?.styleName}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Design Name:</h1>
            <h1 className="text-sm">{item?.designName}</h1>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border-1 border-gray-700">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white font-semibold text-lg">Cutting</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.cutting_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Cutting No:</h1>
              <h1 className="text-sm">#{item?.cuttingNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Cutting Rate:</h1>
              <h1 className="text-sm">Tk. {item?.cutting_rate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Fabrics Rate:</h1>
              <h1 className="text-sm">Tk. {item?.cutting_fabricsRate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Fabrics Weight:</h1>
              <h1 className="text-sm">{item?.cutting_fabricsWeight} KG</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Cutting Status:</h1>
              <h1 className="text-sm">
                <Chip 
                  radius="sm" 
                  size="sm" 
                  color={statusColorMap[item.cutting_status]}
                  className="capitalize" 
                  variant="flat">{item?.cutting_status}
                </Chip>
              </h1>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border-1 border-gray-700">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white font-semibold text-lg">Embrodery</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.embrodery_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Project ID:</h1>
            <h1 className="text-sm">#{item?.itemNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Embrodery Rate:</h1>
              <h1 className="text-sm">Tk. {item?.embrodery_rate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Reject:</h1>
              <h1 className="text-sm">{item?.embrodery_reject} Pcs</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Description:</h1>
              <h1 className="text-sm">{item?.embrodery_desceiption}k Stich</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Embrodery Status:</h1>
              <h1 className="text-sm">
                <Chip 
                  radius="sm" 
                  size="sm" 
                  color={statusColorMap[item.embrodery_status]}
                  className="capitalize" 
                  variant="flat">{item?.embrodery_status}
                </Chip>
              </h1>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border-1 border-gray-700">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white font-semibold text-lg">Printing</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.printing_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Project ID:</h1>
            <h1 className="text-sm">#{item?.itemNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Printing Rate:</h1>
              <h1 className="text-sm">Tk. {item?.printing_rate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Reject:</h1>
              <h1 className="text-sm">{item?.printing_reject} Pcs</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Description:</h1>
              <h1 className="text-sm">{item?.printing_desceiption}k Stich</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Printing Status:</h1>
              <h1 className="text-sm">
                <Chip 
                  radius="sm" 
                  size="sm" 
                  color={statusColorMap[item.printing_status]}
                  className="capitalize" 
                  variant="flat">{item?.printing_status}
                </Chip>
              </h1>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border-1 border-gray-700">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white font-semibold text-lg">Printing</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.printing_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Project ID:</h1>
            <h1 className="text-sm">#{item?.itemNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Printing Rate:</h1>
              <h1 className="text-sm">Tk. {item?.printing_rate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Reject:</h1>
              <h1 className="text-sm">{item?.printing_reject} Pcs</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Description:</h1>
              <h1 className="text-sm">{item?.printing_desceiption}k Stich</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Printing Status:</h1>
              <h1 className="text-sm">
                <Chip 
                  radius="sm" 
                  size="sm" 
                  color={statusColorMap[item.printing_status]}
                  className="capitalize" 
                  variant="flat">{item?.printing_status}
                </Chip>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ViewSingleReport
