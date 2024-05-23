import {Chip} from "@nextui-org/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import "./Dashboard.css";
import Line from "../../components/Charts/Line";
import Bar from "../../components/Charts/Bar";
import Area from "../../components/Charts/Area";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function Dashboard() {
  const axiosPublic = useAxiosPublic();
  const {data: reportData = [], isLoading: isReportLoading} = useQuery({
    queryKey: ["reportData"],
    queryFn: async()=>{
      const res = await axiosPublic.get("/reportData");
      return res.data;
    }
  })
  const commaSeparetor = (num) => {
    const options = {  maximumFractionDigits: 2 };
    const total = Intl.NumberFormat("en-US",options).format(num);
    return total;
  }
  const totalQuantity = reportData.reduce((total, item) => {return total+parseInt(item?.quantityPcs)}, 0);
  const totalReject = reportData.reduce((accumulator, item) => {
    const itemTotal = Object.keys(item)
      .filter(key => key.endsWith('_reject'))
      .reduce((sum, key) => sum + parseInt(item[key]), 0);
    return accumulator + itemTotal;
  }, 0);
  return (
    <div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        <div className=" bg-[#ffe300] rounded-3xl gap-4 p-8">
          <div>
          <h1 className="text-lg text-black font-semibold">Total Quantity</h1>
          <p className="mt-1 text-black">Token representing your tols</p>
          </div>
          <div className="pt-6">
          <h1 className="text-3xl font-bold text-black">{commaSeparetor(totalQuantity)} Pcs</h1>
          <div className="flex items-center justify-start gap-2 pt-4">
          <Chip classNames={{
            base: "bg-white",
            content: "drop-shadow shadow-black text-black font-medium",
          }} startContent={<FaCaretDown size={14} color="#000000"/>} >23.32%</Chip>
          <span className="text-base text-black">This Week</span>
          </div>
          </div>
        </div>
        <div className=" bg-[#ffcdff] rounded-3xl gap-4 p-8">
          <div>
          <h1 className="text-lg text-black font-semibold">Total Rejet</h1>
          <p className="mt-1 text-black">Token representing your tols</p>
          </div>
          <div className="pt-6">
          <h1 className="text-3xl font-bold text-black">{commaSeparetor(totalReject)}</h1>
          <div className="flex items-center justify-start gap-2 pt-4">
          <Chip classNames={{
            base: "bg-white",
            content: "drop-shadow shadow-black text-black font-medium",
          }} startContent={<FaCaretUp size={14} color="#000000"/>} >1.32%</Chip>
          <span className="text-base text-black">This Week</span>
          </div>
          </div>
        </div>
        <div className=" bg-[#e4daff] rounded-3xl gap-4 p-8">
          <div>
          <h1 className="text-lg text-black font-semibold">Total Project</h1>
          <p className="mt-1 text-black">Token representing your tols</p>
          </div>
          <div className="pt-6">
          <h1 className="text-3xl font-bold text-black">{reportData.length}</h1>
          <div className="flex items-center justify-start gap-2 pt-4">
          <Chip classNames={{
            base: "bg-white",
            content: "drop-shadow shadow-black text-black font-medium",
          }} startContent={<FaCaretDown size={14} color="#000000"/>} >20.32%</Chip>
          <span className="text-base text-black">This Week</span>
          </div>
          </div>
        </div>
      </div>
      <div className="py-6 gap-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
        <Line />
        <Bar />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
