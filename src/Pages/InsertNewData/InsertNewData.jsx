import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';    
import { Button, Input, DatePicker, Select, SelectItem, Chip } from "@nextui-org/react";

const statusOptions = [
{name: "Active", uid: "active"},
{name: "Paused", uid: "paused"},
{name: "Complete", uid: "complete"},
];

const statusColorMap = {active: "primary",paused: "danger",complete: "success"};

const cuttingNo = [23,67,89,98,76,65,54,43,32,25,78,45];
const designName = ["J.G Embo", "Form Fushion", "Bold Brush", "Palette Pro", "Mint K.P"];
const styleName = ["Polo Shirt", "Jins", "Smart Shirt", "Easy Cap", "Fine Mate"];

function InsertNewData() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  };
  return (
    <div>
      <Helmet title='Add New Project | Mayer Doa Inventory'/>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          {/* <h3 className="text-base text-foreground-500">General Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <DatePicker className="max-w-52" label={"Entry Date"} labelPlacement="outside" variant={"bordered"} />
          <Select 
          labelPlacement="outside" 
          placeholder="0" 
          variant={"bordered"} 
          {...register("cuttingNo")}
          label="Select Cutting No." className="max-w-52" >
          {cuttingNo.map((item) => <SelectItem key={item} textValue={item} value={item}>{item}</SelectItem>)}
          </Select>
          <Select 
          labelPlacement="outside" 
          placeholder="Design Name" 
          variant={"bordered"} 
          {...register("designName")}
          label="Select Design Name." className="max-w-52" >
          {designName.map((item) => <SelectItem key={item} textValue={item} value={item}>{item}</SelectItem>)}
          </Select>
          <Select 
          labelPlacement="outside" 
          placeholder="Style Name" 
          variant={"bordered"} 
          {...register("styleName")}
          label="Select Style Name." className="max-w-52" >
          {styleName.map((item) => <SelectItem key={item} textValue={item} value={item}>{item}</SelectItem>)}
          </Select>
          <Input
            type="number"
            label="Quantity (Pcs)"
            variant="bordered"
            className="max-w-44"
            labelPlacement="outside"
            placeholder="Pcs"
            {...register("quantityPcs")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Cutting Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <DatePicker className="max-w-52" label={"Cutting Date"} labelPlacement="outside" variant={"bordered"} />
          <Select 
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("cutting_status")}
          label="Cutting Status" className="max-w-48" >
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Cutting Rate"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0.0"
            {...register("cutting_rate")}
          />
          <Input
            type="number"
            label="Fabrics Weight"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0 KG"
            {...register("cutting_fabricsWeight")}
          />
          <Input
            type="number"
            label="Fabrics Rate"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0.0 Tk"
            {...register("cutting_fabricsRate")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Embrodery Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <DatePicker className="max-w-52" label={"Embrodery Date"} labelPlacement="outside" variant={"bordered"} />
          <Select 
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("embrodery_status")}
          label="Embrodery Status" className="max-w-48" >
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Embrodery Rate"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0.0"
            {...register("embrodery_rate")}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="Pcs"
            {...register("embrodery_reject")}
          />
          <Input
            type="number"
            label="Stich"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="10k"
            {...register("embrodery_desceiption")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Embrodery Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <DatePicker className="max-w-52" label={"Printing Date"} labelPlacement="outside" variant={"bordered"} />
          <Select 
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("printing_status")}
          label="Printing Status" className="max-w-48" >
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Printing Rate"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0.0"
            {...register("printing_rate")}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="Pcs"
            {...register("printing_reject")}
          />
          <Input
            type="number"
            label="Decription"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="Write.."
            {...register("printing_desceiption")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Sewing Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <DatePicker className="max-w-52" label={"Sewing Date"} labelPlacement="outside" variant={"bordered"} />
          <Select 
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("sewing_status")}
          label="Sewing Status" className="max-w-48" >
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Sewing Rate"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0.0"
            {...register("sewing_rate")}
          />
          <Input
            type="number"
            label="Accessories Cost"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="0.0"
            {...register("sewing_accessoriesCost")}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="Pcs"
            {...register("sewing_reject")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Sewing Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <DatePicker className="max-w-52" label={"Finising Date"} labelPlacement="outside" variant={"bordered"} />
          <Select 
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("finising_status")}
          label="Finising Status" className="max-w-48" >
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="text"
            label="Details"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="Marsrize"
            {...register("details")}
          />
          <Input
            type="text"
            label="Description"
            variant="bordered"
            className="max-w-48"
            labelPlacement="outside"
            placeholder="Write..."
            {...register("description")}
          />
          </div>
        </div>
        <Button type="submit" color="primary">Confirm</Button>
      </form> 
    </div>
  )
}

export default InsertNewData
