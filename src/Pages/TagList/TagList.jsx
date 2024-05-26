import {Card, CardBody, Input, Button, Chip } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { toast } from 'react-hot-toast';


function TagList() {
    const initialNumber = [23, 156, 78, 245, 187, 65, 274];
    const initialStyleName = [
        "Boho Chic",
        "Casual Cool",
        "Urban Edge",
        "Vintage Glam",
        "Streetwear",
        "Eclectic Fusion"
      ];
    const initialDesignName = [
        "Ethereal Elegance",
        "Urban Chic",
        "Vintage Vogue",
        "Street Style",
        "Glamour Grace",
        "Timeless Trends",
        "Avant-Garde Attire"
      ];

    const [cuttingNo, setCuttingNo] = useState(initialNumber);
    const [styleName, setStyleName] = useState(initialStyleName);
    const [designName, setDesignName] = useState(initialDesignName);
    const { register, handleSubmit, reset, formState: { errors }} = useForm();
    const { register: styelRegister, reset: styleInputReset, handleSubmit: styleHandleSubmit, formState: { errors: styleErrors } } = useForm();
    const { register: designRegister, reset: designInputReset, handleSubmit: designHandleSubmit, formState: { errors: designErrors } } = useForm();

    const onSubmit = (data) => {
       toast.success('Added Successfully!',{duration: 2000})
       setCuttingNo([...cuttingNo, data.cuttingNo]);
       reset()
    };

    const onStyleSubmit = (data) => {
       toast.success('Added Successfully!',{duration: 2000})
       setStyleName([...styleName, data.styleName]);
       styleInputReset()
    };

    const onDesignSubmit = (data) => {
       toast.success('Added Successfully!',{duration: 2000})
       setDesignName([...designName, data.designName]);
       designInputReset()
    };

    const deleteStyleName = (itemToRemove) => {
      toast('Deleted Successfully!', {icon: '🗑️',duration: 2000});
      setStyleName(styleName.filter(item => item !== itemToRemove));
      if (styleName.length === 1) {
        setStyleName(initialStyleName);
      }
    };
    const deleteCuttingNo = (itemToRemove) => {
      toast('Deleted Successfully!', {icon: '🗑️',duration: 2000});
      setCuttingNo(cuttingNo.filter(item => item !== itemToRemove));
      if (cuttingNo.length === 1) {
        setCuttingNo(initialNumber);
      }
    };
    const deleteDesignName = (itemToRemove) => {
      toast('Deleted Successfully!', {icon: '🗑️',duration: 2000});
      setDesignName(designName.filter(item => item !== itemToRemove));
      if (designName.length === 1) {
        setDesignName(initialDesignName);
      }
    };
  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
        <Card>
          <CardBody className="p-6 h-96 flex flex-col gap-6">
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
          <CardBody className="p-6 h-96 flex flex-col gap-6">
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
                <Button startContent={<IoIosAddCircle size={20} />} type="submit" color="primary">
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
        <Card>
          <CardBody className="p-6 h-96 flex flex-col gap-6">
            <div>
            <form onSubmit={designHandleSubmit(onDesignSubmit)}>
                <h1 className="mb-2">Add Design Name</h1>
                <div className="flex  justify-center gap-3">
                <Input
                radius="sm"
                type="text"
                variant="bordered"
                placeholder="Example T-Shirt, Jins, Bag"
                {...designRegister("designName", { required: true })}
                isInvalid={designErrors.designName ? true : false}
                errorMessage="Please Design Name"
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
            {designName.map((name, index) => (
                <Chip key={index} onClose={() => deleteDesignName(name)} variant="flat">
                {name}
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
