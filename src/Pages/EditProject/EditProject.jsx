import { useForm, Controller } from "react-hook-form";
import { Helmet } from 'react-helmet-async';    
import { Button, Input, DatePicker, Select, SelectItem, Chip } from "@nextui-org/react";
import {today, getLocalTimeZone} from '@internationalized/date';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

const statusOptions = [
{name: "Active", uid: "active"},
{name: "Paused", uid: "paused"},
{name: "Complete", uid: "complete"},
];

const statusColorMap = {active: "primary",paused: "danger",complete: "success"};

const cuttingNo = [23, 156, 78, 245, 187, 65, 274];
const designName = [
  "Ethereal Elegance",
  "Urban Chic",
  "Vintage Vogue",
  "Street Style",
  "Glamour Grace",
  "Timeless Trends",
  "Avant-Garde Attire",
  "J.G Embo"
];
const styleName = [
  "Boho Chic",
  "Casual Cool",
  "Urban Edge",
  "Vintage Glam",
  "Streetwear",
  "Eclectic Fusion"
];

function EditProject() {
  const loaderData = useLoaderData();
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const onSubmit = async (data) => {
    const decimalConvert = (num) => (Math.round(num * 100 / 100).toFixed(2));
    const finising_rate = decimalConvert(data.finising_rate);
    const entry_date = data.entry_date.toString();
    const description = data.description;
    const cuttingNo = data.cuttingNo;
    const details = data.details;
    const quantityPcs = data.quantityPcs;
    const designName = data.designName;
    const finising_date = data.finising_date.toString();
    const finising_status = data.finising_status;
    const styleName = data.styleName;
    const cutting_date = data.cutting_date.toString();
    const cutting_status = data.cutting_status;
    const cutting_rate = decimalConvert(data.cutting_rate);
    const cutting_fabricsWeight = decimalConvert(data.cutting_fabricsWeight);
    const cutting_fabricsRate = decimalConvert(data.cutting_fabricsRate);
    const embrodery_rate = decimalConvert(data.embrodery_rate);
    const embrodery_reject = data.embrodery_reject;
    const embrodery_date = data.embrodery_date.toString();
    const embrodery_status = data.embrodery_status;
    const embrodery_desceiption = data.embrodery_desceiption;
    const printing_desceiption = data.printing_desceiption;
    const printing_rate = decimalConvert(data.printing_rate);
    const printing_reject = data.printing_reject;
    const printing_date = data.printing_date.toString();
    const printing_status = data.printing_status;
    const sewing_rate = decimalConvert(data.sewing_rate);
    const sewing_reject = data.sewing_reject;
    const sewing_date = data.sewing_date.toString();
    const sewing_status = data.sewing_status;
    const sewing_accessoriesCost = data.sewing_accessoriesCost;


    const projectData = {finising_rate, entry_date, quantityPcs, description, details, designName, finising_date, finising_status, styleName, cuttingNo, cutting_date, cutting_status, cutting_rate, cutting_fabricsWeight, cutting_fabricsRate, embrodery_rate, embrodery_reject, embrodery_date, embrodery_status, embrodery_desceiption, printing_desceiption, printing_rate, printing_reject, printing_date, printing_status, sewing_rate, sewing_reject, sewing_date, sewing_status, sewing_accessoriesCost};
    try {
      const response = await axiosPublic.patch(`/reportData/${loaderData?._id}`, projectData);
      if(response.data.modifiedCount){
        Swal.fire({
          icon: "success",
          title: "Project Updated Successfully.",
        });
      }
  } catch (error) {
      console.error('There was an error updating the Project:', error);
  }
  };
  let localDate = today(getLocalTimeZone());
  return (
    <div>
      <Helmet title='Update Project | Mayer Doa Inventory'/>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          {/* <h3 className="text-base text-foreground-500">General Details</h3> */}
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
          <Controller
            name="entry_date"
            control={control}
            defaultValue={localDate}
            render={({ field }) => (
              <DatePicker
                {...field}
                variant={"bordered"}
                label={"Entry Date"}
                labelPlacement="outside"
              />
            )}
          />
          <Select 
          labelPlacement="outside" 
          placeholder="0" 
          variant={"bordered"} 
          {...register("cuttingNo", {required: true})}
          defaultSelectedKeys={[loaderData?.cuttingNo]}
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
          defaultSelectedKeys={[loaderData?.designName]}
          {...register("designName", {required: true})}
          label="Select Design Name.">
          {designName.map((item) => <SelectItem key={item} textValue={item} value={item}>{item}</SelectItem>)}
          </Select>

          <Select
          labelPlacement="outside" 
          placeholder="Style Name" 
          variant={"bordered"} 
          defaultSelectedKeys={[loaderData?.styleName]}
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
            defaultValue={loaderData?.quantityPcs}
            {...register("quantityPcs", {required: true})}
            isInvalid={errors.quantityPcs ? true : false}
            errorMessage={errors.quantityPcs ? "Enter Quantity" : ""}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Cutting Details</h3> */}
          <div className="grid items-center lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
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
          defaultSelectedKeys={[loaderData?.cutting_status]}
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
            placeholder="0.0 Tk"
            inputMode="decimal"
            defaultValue={loaderData?.cutting_rate}
            {...register("cutting_rate", {required: true})}
            isInvalid={errors.cutting_rate ? true : false}
            errorMessage={errors.cutting_rate ? "Enter Cutting Rate" : ""}
          />
          <Input
            type="number"
            label="Fabrics Weight"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0 KG"
            defaultValue={loaderData?.cutting_fabricsWeight}
            {...register("cutting_fabricsWeight", {required: true})}
            isInvalid={errors.cutting_fabricsWeight ? true : false}
            errorMessage={errors.cutting_fabricsWeight ? "Enter Fabrics Weight" : ""}
          />
          <Input
            type="number"
            label="Fabrics Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0 Tk"
            defaultValue={loaderData?.cutting_fabricsRate}
            {...register("cutting_fabricsRate", {required: true})}
            isInvalid={errors.cutting_fabricsRate ? true : false}
            errorMessage={errors.cutting_fabricsRate ? "Enter Fabrics Cutting Rate" : ""}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Embrodery Details</h3> */}
          <div className="grid items-center lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
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
          variant={"bordered"} 
          {...register("embrodery_status")}
          defaultSelectedKeys={[loaderData?.embrodery_status]}
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
            placeholder="0.0 Tk"
            defaultValue={loaderData?.embrodery_rate}
            {...register("embrodery_rate", {required: true})}
            isInvalid={errors.embrodery_rate ? true : false}
            errorMessage={errors.embrodery_rate ? "Enter Embrodery Rate" : ""}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0 Pcs"
            defaultValue={loaderData?.embrodery_reject}
            {...register("embrodery_reject", {required: true})}
            isInvalid={errors.embrodery_reject ? true : false}
            errorMessage={errors.embrodery_reject ? "Enter Reject Quantity" : ""}
          />
          <Input
            type="number"
            label="Stich"
            variant="bordered"
            labelPlacement="outside"
            placeholder="10k"
            defaultValue={loaderData?.embrodery_desceiption}
            {...register("embrodery_desceiption")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Embrodery Details</h3> */}
          <div className="grid items-center lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
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
          defaultSelectedKeys={[loaderData?.printing_status]}
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
            placeholder="0.0 Tk"
            defaultValue={loaderData?.printing_rate}
            {...register("printing_rate", {required: true})}
            isInvalid={errors.printing_rate ? true : false}
            errorMessage={errors.printing_rate ? "Enter Printing Rate" : ""}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0 Pcs"
            defaultValue={loaderData?.printing_reject}
            {...register("printing_reject", {required: true})}
            isInvalid={errors.printing_reject ? true : false}
            errorMessage={errors.printing_reject ? "Enter Reject Quantity" : ""}
          />
          <Input
            type="text"
            label="Printing Decription"
            variant="bordered"
            labelPlacement="outside"
            placeholder="Write.."
            defaultValue={loaderData?.printing_desceiption}
            {...register("printing_desceiption")}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Sewing Details</h3> */}
          <div className="grid items-center lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
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
          defaultSelectedKeys={[loaderData?.sewing_status]}
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
            placeholder="0.0 Tk"
            defaultValue={loaderData?.sewing_rate}
            {...register("sewing_rate", {required: true})}
            isInvalid={errors.sewing_rate ? true : false}
            errorMessage={errors.sewing_rate ? "Enter Sewing Rate" : ""}
          />
          <Input
            type="number"
            label="Accessories Cost"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0 Tk"
            defaultValue={loaderData?.sewing_accessoriesCost}
            {...register("sewing_accessoriesCost", {required: true})}
            isInvalid={errors.sewing_accessoriesCost ? true : false}
            errorMessage={errors.sewing_accessoriesCost ? "Enter Sewing Acc Cost" : ""}
          />
          <Input
            type="number"
            label="Reject (Pcs)"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0 Pcs"
            defaultValue={loaderData?.sewing_reject}
            {...register("sewing_reject", {required: true})}
            isInvalid={errors.sewing_reject ? true : false}
            errorMessage={errors.sewing_reject ? "Enter Reject Quantity" : ""}
          />
          </div>
        </div>
        <div>
          {/* <h3 className="text-base text-foreground-500">Sewing Details</h3> */}
          <div className="grid items-center lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 py-4">
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
          defaultSelectedKeys={[loaderData?.finising_status]}
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
            defaultValue={loaderData?.description}
            placeholder="Write..."
            {...register("description")}
          />
          <Input
            type="number"
            label="Finishing Rate"
            variant="bordered"
            labelPlacement="outside"
            placeholder="0.0 Tk"
            inputMode="decimal"
            defaultValue={loaderData?.finising_rate}
            {...register("finising_rate", {required: true})}
            isInvalid={errors.cutting_fabricsRate ? true : false}
            errorMessage={errors.cutting_fabricsRate ? "Enter Finishing Rate" : ""}
          />
          </div>
        </div>
        <Button type="submit" color="primary">Confirm</Button>
      </form> 
    </div>
  )
}

export default EditProject
