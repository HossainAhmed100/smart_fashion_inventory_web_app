import {Card, CardBody, Input, Button, Chip } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPricetag, IoIosAddCircle } from "react-icons/io";
import { toast } from 'react-hot-toast';


function TagList() {
    const initialNumber = [34, 53, 42];
    const initialStyleName = ["Apple", "Banana", "Cherry", "Watermelon", "Orange"];
    const [cuttingNo, setCuttingNo] = useState(initialNumber);
    const [styleName, setStyleName] = useState(initialStyleName);
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const { register: styelRegister, reset: styleInputReset, handleSubmit: styleHandleSubmit, formState: { errors: styleErrors } } = useForm();
    const onSubmit = (data) => {
        toast.success('Added Successfully!',{position: 'bottom-right', duration: 2000})
        setCuttingNo([...cuttingNo, data.cuttingNo]);
        reset()
    };
    const onStyleSubmit = (data) => {
        toast.success('Added Successfully!',{position: 'bottom-right', duration: 2000})
        setStyleName([...styleName, data.styleName]);
        styleInputReset()
    };

    const deleteStyleName = (itemToRemove) => {
      setStyleName(styleName.filter(item => item !== itemToRemove));
      if (styleName.length === 1) {
        setStyleName(initialStyleName);
      }
    };
    const deleteCuttingNo = (itemToRemove) => {
      setCuttingNo(cuttingNo.filter(item => item !== itemToRemove));
      if (cuttingNo.length === 1) {
        setCuttingNo(initialNumber);
      }
    };
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
        <Card>
          <CardBody className="p-6 h-72 flex flex-col gap-6">
            <div>
            <form onSubmit={styleHandleSubmit(onStyleSubmit)}>
                <h1 className="mb-2">Add Style Name</h1>
                <div className="flex  justify-center gap-3">
                <Input
                radius="sm"
                type="text"
                variant="bordered"
                placeholder="Example.. Polo Shirt, J.P. Tor"
                {...styelRegister("styleName", { required: true })}
                isInvalid={styleErrors.styleName ? true : false}
                errorMessage="Please Type Stayle Name"
                className="flex-1"
                />
                <Button startContent={<IoIosAddCircle size={20} />} type="submit" color="primary">
                Add
                </Button> 
                </div>
            </form>
            </div>
            <div className="p-2 border border-gray-600 rounded-md w-full h-full">
            <div className="flex flex-wrap gap-2">
            {styleName.map((name, index) => (
               <Chip key={index} onClose={() => deleteStyleName(name)} variant="flat">
                {name}
               </Chip>
            ))}
            </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6 h-72 flex flex-col gap-6">
            <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-2">Add Cutting Number</h1>
                <div className="flex  justify-center gap-3">
                <Input
                radius="sm"
                type="number"
                variant="bordered"
                placeholder="Example 50, 66"
                {...register("cuttingNo", { required: true })}
                isInvalid={errors.cuttingNo ? true : false}
                errorMessage="Please enter Number"
                className="flex-1"
                />
                <Button startContent={<IoMdPricetag size={20} />} type="submit" color="primary">
                Add
                </Button> 
                </div>
            </form>
            </div>
            <div className="p-2 border border-gray-600 rounded-md w-full h-full">
            <div className="flex flex-wrap gap-2">
            {cuttingNo.map((fruit, index) => (
                <Chip key={index} onClose={() => deleteCuttingNo(fruit)} variant="flat">
                {fruit}
                </Chip>
            ))}
            </div>
            </div>
          </CardBody>
        </Card>
</div>
    </div>
  )
}

export default TagList
