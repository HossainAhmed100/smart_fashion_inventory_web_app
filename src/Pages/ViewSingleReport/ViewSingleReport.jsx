import { Button, Chip } from "@nextui-org/react";
import { useLoaderData } from "react-router-dom"
import { FaPrint } from "react-icons/fa6";
import Swal from "sweetalert2";

const statusColorMap = {
  notStarted: "warning",
  inProgress: "primary",
  inProduction: "secondary",
  cancelled: "danger",
  completed: "success",
};

function ViewSingleReport() {
    const item = useLoaderData();
    const totalReject = (sewing_reject, printing_reject, embrodery_reject)=>{
      const rejectQuantity = [sewing_reject, printing_reject, embrodery_reject];
      const total = rejectQuantity.reduce((quantity, current) => quantity + parseFloat(current), 0);
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
    const totalSewingCost = (rate, quantity, accessoriesCost) => {
      const cost = parseInt(accessoriesCost) + parseInt(rate);
      const totalPrice = quantity * cost;
      const options = {  maximumFractionDigits: 2 };
      const total = Intl.NumberFormat("en-US",options).format(totalPrice);
      const result = total;
      return result;
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
      const result = parseFloat(total).toFixed(2);
      return result;
  
    }
    const handlePrint = () => {
      Swal.fire({
        title: "Notice",
        text: "This Project is under Development!",
        icon: "info"
      });
    }
  return (
    <div className="p-1">
      <div className="w-full pb-8 flex items-center justify-center">
      <Button onClick={handlePrint} color="danger" variant="shadow" startContent={<FaPrint />}>
        Print this Report
      </Button>
      </div>
      <div className="grid grid-flow-row-dense lg:grid-cols-3 md:grid-col-2 grid-cols-1 gap-4">
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
              <h1 className="text-sm">Total Quantity:</h1>
              <h1 className="text-sm">{item?.quantityPcs}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Design Name:</h1>
              <h1 className="text-sm">{item?.designName}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Style Name:</h1>
              <h1 className="text-sm">{item?.styleName}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Details:</h1>
              <h1 className="text-sm">Tk. {item?.details}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Entry Date:</h1>
              <h1 className="text-sm">{item?.entry_date}</h1>
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
              <h1 className="text-sm">Fabrics Cost Per (Pcs):</h1>
              <h1 className="text-sm">Tk. {fabricCostPerPcs(item?.cutting_fabricsWeight, item?.cutting_fabricsRate, item?.quantityPcs)}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Cost Per (Pcs):</h1>
              <h1 className="text-sm">Tk. {totalCostPerUnit(item?.cutting_fabricsWeight, item?.cutting_fabricsRate, item?.quantityPcs, item?.cutting_rate)}</h1>
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
              <h1 className="text-sm">Total Embrodery Cost:</h1>
              <h1 className="text-sm">Tk. {rateCalculete(item.embrodery_rate, item.quantityPcs)}</h1>
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
              <h1 className="text-sm">Total Printing Cost:</h1>
              <h1 className="text-sm">Tk. {rateCalculete(item.printing_rate, item.quantityPcs)}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Description:</h1>
              <h1 className="text-sm">{item?.printing_desceiption}</h1>
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
            <h1 className="text-white font-semibold text-lg">Sewing</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.sewing_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Project ID:</h1>
            <h1 className="text-sm">#{item?.itemNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Sewing Rate:</h1>
              <h1 className="text-sm">Tk. {item?.sewing_rate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Accessories Cost:</h1>
              <h1 className="text-sm">Tk. {item?.sewing_accessoriesCost}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Reject:</h1>
              <h1 className="text-sm">{item?.sewing_reject} Pcs</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Sewing Cost:</h1>
              <h1 className="text-sm">Tk. {totalSewingCost(item.sewing_rate, item.quantityPcs, item.sewing_accessoriesCost)}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Sewing Status:</h1>
              <h1 className="text-sm">
                <Chip 
                  radius="sm" 
                  size="sm" 
                  color={statusColorMap[item.sewing_status]}
                  className="capitalize" 
                  variant="flat">{item?.sewing_status}
                </Chip>
              </h1>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border-1 border-gray-700">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white font-semibold text-lg">Finising</h1>
            <Chip radius="sm" size="sm" color="success" variant="flat">{item?.finising_date}</Chip>
          </div>
          <div className="flex flex-col items-start justify-center gap-2 pt-6">
            <div className="flex items-center justify-between w-full">
            <h1 className="text-sm">Project ID:</h1>
            <h1 className="text-sm">#{item?.itemNo}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Reject:</h1>
              <h1 className="text-sm">{totalReject(item?.sewing_reject, item?.printing_reject, item?.embrodery_reject)} Pcs</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Finising Rate:</h1>
              <h1 className="text-sm">Tk. {item?.finising_rate}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Total Cost Per (Pcs):</h1>
              <h1 className="text-sm">Tk. {totalCostPerPcs(
              item?.sewing_rate, 
              item?.printing_rate, 
              item?.embrodery_rate, 
              item?.cutting_rate,
              item?.cutting_fabricsRate,
              item?.cutting_fabricsWeight,
              item?.sewing_accessoriesCost, 
              item?.finising_rate,
              item?.quantityPcs)}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Details:</h1>
              <h1 className="text-sm">Tk. {item?.details}</h1>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-sm">Finising Status:</h1>
              <h1 className="text-sm">
                <Chip 
                  radius="sm" 
                  size="sm" 
                  color={statusColorMap[item.finising_status]}
                  className="capitalize" 
                  variant="flat">{item?.finising_status}
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
