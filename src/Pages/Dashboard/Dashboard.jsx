import {Chip} from "@nextui-org/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import "./Dashboard.css";
import Line from "../../components/Charts/Line";
import Bar from "../../components/Charts/Bar";
import Area from "../../components/Charts/Area";

function Dashboard() {
  return (
    <div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="flex-1 bg-[#ffe300] rounded-3xl gap-4 p-8  min-w-44">
          <div>
          <h1 className="text-lg text-black font-semibold">Total Quantity</h1>
          <p className="mt-1 text-black">Token representing your tols</p>
          </div>
          <div className="pt-6">
          <h1 className="text-3xl font-bold text-black">4,234,686</h1>
          <div className="flex items-center justify-start gap-2 pt-4">
          <Chip classNames={{
            base: "bg-white",
            content: "drop-shadow shadow-black text-black font-medium",
          }} startContent={<FaCaretDown size={14} color="#000000"/>} >23.32%</Chip>
          <span className="text-base text-black">This Week</span>
          </div>
          </div>
        </div>
        <div className="flex-1 bg-[#ffcdff] rounded-3xl gap-4 p-8  min-w-44">
          <div>
          <h1 className="text-lg text-black font-semibold">Total Rejet Pcs</h1>
          <p className="mt-1 text-black">Token representing your tols</p>
          </div>
          <div className="pt-6">
          <h1 className="text-3xl font-bold text-black">898</h1>
          <div className="flex items-center justify-start gap-2 pt-4">
          <Chip classNames={{
            base: "bg-white",
            content: "drop-shadow shadow-black text-black font-medium",
          }} startContent={<FaCaretUp size={14} color="#000000"/>} >1.32%</Chip>
          <span className="text-base text-black">This Week</span>
          </div>
          </div>
        </div>
        <div className="flex-1 bg-[#e4daff] rounded-3xl gap-4 p-8  min-w-44">
          <div>
          <h1 className="text-lg text-black font-semibold">Compeleted Project</h1>
          <p className="mt-1 text-black">Token representing your tols</p>
          </div>
          <div className="pt-6">
          <h1 className="text-3xl font-bold text-black">4,234,867</h1>
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
        <Area />
        <Bar />
        </div>
        <Line />
      </div>
    </div>
  )
}

export default Dashboard
