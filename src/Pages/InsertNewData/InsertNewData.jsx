import { useForm, Controller } from "react-hook-form";
import { Helmet } from 'react-helmet-async';    
import { Button, Input, DatePicker, Select, SelectItem, Chip } from "@nextui-org/react";
import {today, getLocalTimeZone} from '@internationalized/date';

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
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
  };
  let localDate = today(getLocalTimeZone());
  return (
    <div>
      <Helmet title='Add New Project | Mayer Doa Inventory'/>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          {/* <h3 className="text-base text-foreground-500">General Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="entry_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Entry Date"}
                defaultValue={localDate}
                labelPlacement="outside"
              />
            )}
          />
          <Select 
          labelPlacement="outside" 
          placeholder="0" 
          variant={"bordered"} 
          {...register("cuttingNo", {required: true})}
          errorMessage={errors?.cuttingNo ? "You must select a cat" : ""}
          isInvalid={errors?.cuttingNo ? true : false}
          label="Select Cutting No.">
          {cuttingNo.map((item) => (
          <SelectItem key={item} textValue={item} value={item}
          >
            {item}
          </SelectItem>))}
          </Select>
         
          <Select 
          labelPlacement="outside" 
          placeholder="Design Name" 
          variant={"bordered"} 
          {...register("designName", {required: true})}
          label="Select Design Name.">
          {designName.map((item) => <SelectItem key={item} textValue={item} value={item}>{item}</SelectItem>)}
          </Select>

          <Select
          labelPlacement="outside" 
          placeholder="Style Name" 
          variant={"bordered"} 
          {...register("styleName", {required: true})}
          label="Select Style Name.">
          {styleName.map((item) => <SelectItem key={item} textValue={item} value={item}>{item}</SelectItem>)}
          </Select>
          <Input
            type="number"
            label="Quantity (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Pcs"
            {...register("quantityPcs", {required: true})}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Cutting Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="cutting_date"
            control={control}
            defaultValue={localDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Cutting Date"}
                labelPlacement="outside"
              />
            )}
          />
          <Select
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("cutting_status")}
          label="Cutting Status">
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Cutting Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0"
            defaultValue="0.0"
            {...register("cutting_rate")}
          />
          <Input
            type="number"
            label="Fabrics Weight"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0 KG"
            defaultValue="0"
            {...register("cutting_fabricsWeight")}
          />
          <Input
            type="number"
            label="Fabrics Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0 Tk"
            defaultValue="0.0"
            {...register("cutting_fabricsRate")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Embrodery Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="embrodery_date"
            control={control}
            defaultValue={localDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Embrodery Date"}
                labelPlacement="outside"
              />
            )}
          />
          <Select
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("embrodery_status")}
          label="Embrodery Status">
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Embrodery Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0"
            defaultValue="0.0"
            {...register("embrodery_rate")}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Pcs"
            defaultValue="0"
            {...register("embrodery_reject")}
          />
          <Input
            type="number"
            label="Stich"
            variant="bordered"
            labelPlacement="outside"
            placeholder="10k"
            defaultValue="10k"
            {...register("embrodery_desceiption")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Embrodery Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="printing_date"
            control={control}
            defaultValue={localDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Printing Date"}
                labelPlacement="outside"
              />
            )}
          />
          <Select
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("printing_status")}
          label="Printing Status">
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Printing Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0"
            defaultValue="0.0"
            {...register("printing_rate")}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Pcs"
            defaultValue="0"
            {...register("printing_reject")}
          />
          <Input
            type="text"
            label="Decription"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Write.."
            defaultValue="---"
            {...register("printing_desceiption")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Sewing Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="sewing_date"
            control={control}
            defaultValue={localDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Sewing Date"}
                labelPlacement="outside"
              />
            )}
          />
          <Select
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("sewing_status")}
          label="Sewing Status">
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="number"
            label="Sewing Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0"
            defaultValue="0.0"
            {...register("sewing_rate")}
          />
          <Input
            type="number"
            label="Accessories Cost"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0"
            defaultValue="0.0"
            {...register("sewing_accessoriesCost")}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Pcs"
            defaultValue="0"
            {...register("sewing_reject")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Sewing Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="finising_date"
            control={control}
            defaultValue={localDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Finising Date"}
                labelPlacement="outside"
              />
            )}
          />
          <Select
          labelPlacement="outside" 
          placeholder="Active" 
          variant={"bordered"} 
          {...register("finising_status")}
          label="Finising Status">
          {statusOptions.map((item) => (
          <SelectItem key={item.uid} textValue={item.name} value={item.uid}>
          <Chip className="capitalize" color={statusColorMap[item.uid]} size="sm" variant="flat">{item.name}</Chip>
          </SelectItem>))}
          </Select>
          <Input
            type="text"
            label="Details"
            variant="bordered"
            labelPlacement="outside"
            defaultValue="Marsrize"
            placeholder="Marsrize"
            {...register("details")}
          />
          <Input
            type="text"
            label="Description"
            variant="bordered"
            labelPlacement="outside"
            defaultValue="---"
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
