import { Outlet, NavLink } from "react-router-dom";
import {Button, Image} from "@nextui-org/react";
import { FaTshirt } from "react-icons/fa";
import { FaAngleRight, FaBezierCurve, FaArrowRightFromBracket } from "react-icons/fa6";
import { PiJoystickFill } from "react-icons/pi";
import { IoIosCut } from "react-icons/io";
import { GiSewingMachine } from "react-icons/gi";
import { FaTasks } from "react-icons/fa";
import "./Main.css"

function Main() {
  return (
    <div className="flex h-dvh w-full">
      <div className="relative flex h-full w-72 flex-col !border-r-small border-divider p-6 transition-width">
      <div className="flex items-center gap-3 px-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
          <FaTshirt size={24} className="text-background"/>
        </div>
        <div className="flex max-w-full flex-col">
        <p className="text-small font-bold uppercase opacity-100">MAYER DOA</p>
        <p className="truncate text-tiny text-default-400">FASHION</p> 
        </div>
      </div>
      <span aria-hidden="true" className="w-px h-px block ml-1 mt-8"></span>
    
      <div className="flex items-center gap-3 px-3">
        <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-8 h-8 text-tiny bg-default text-default-foreground rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default flex-none">
        <Image src="https://i.pravatar.cc/150?u=a04258114e29026708c" alt="avatar" />
        </span>
        <div className="flex max-w-full flex-col">
        <p className="truncate text-small font-medium text-default-600">Hossain Ahmed</p>
          <p className="truncate text-tiny text-default-400">Product Manager</p>
        </div>
      </div>
      <div className="overflow-y-auto -mr-6 h-full max-h-full py-6 pr-6" data-orientation="vertical" data-top-scroll="false" data-bottom-scroll="true">
        <div data-slot="base" className="w-full relative flex flex-col gap-1 p-1 list-none">
          <nav data-slot="list" className="w-full flex flex-col gap-0.5 outline-none items-center scrollbar-none	 scrollbar-track-slate-300 h-32	">
          <li data-slot="base" role="presentation" className="relative mb-2 w-full">
            <span className="pl-1 text-tiny text-foreground-500" data-slot="heading">Overview</span>
            <ul className="mt-2 space-y-1">
              <li>
              <NavLink
              to="/"
              className={({ isActive }) =>
                `flex group gap-2 items-center justify-between relative py-1.5 w-full cursor-pointer outline-none px-3 min-h-11 rounded-large h-[44px] hover:bg-default-50 duration-300 ease-in-out ${
                  isActive ? 'bg-default-50 text-white' : 'bg-transparent text-white'
                }`}>
              {({ isActive }) => (
              <>
              <div className="flex items-center justify-center gap-2">
              <FaBezierCurve size={22} color={isActive ? "white" : "#a1a1aa"}/>
              <span className={`flex-1 ml-1 truncate text-small font-medium ${isActive ? "white" : "text-default-500"} group-data-[selected=true]:text-foreground`} data-slot="heading">Dashboard</span>
              </div>
              <FaAngleRight size={13} color={isActive ? "white" : "#a1a1aa"}/>
              </>
              )}
            </NavLink>
              </li>
              <li>
              <NavLink
              to="/embroideryReport"
              className={({ isActive }) =>
                `flex group gap-2 items-center justify-between relative py-1.5 w-full cursor-pointer outline-none px-3 min-h-11 rounded-large h-[44px] hover:bg-default-50 duration-300 ease-in-out ${
                  isActive ? 'bg-default-50 text-white' : 'bg-transparent text-white'
                }`}>
              {({ isActive }) => (
              <>
              <div className="flex items-center justify-center gap-2">
              <FaBezierCurve size={22} color={isActive ? "white" : "#a1a1aa"}/>
              <span className={`flex-1 ml-1 truncate text-small font-medium ${isActive ? "white" : "text-default-500"} group-data-[selected=true]:text-foreground`} data-slot="heading">Embroidery Report</span>
              </div>
              <FaAngleRight size={13} color={isActive ? "white" : "#a1a1aa"}/>
              </>
              )}
            </NavLink>
              </li>
              <li>
              <NavLink
              to="/printingReport"
              className={({ isActive }) =>
                `flex group gap-2 items-center justify-between relative py-1.5 w-full cursor-pointer outline-none px-3 min-h-11 rounded-large h-[44px] hover:bg-default-50 duration-300 ease-in-out ${
                  isActive ? 'bg-default-50 text-white' : 'bg-transparent text-white'
                }`}>
              {({ isActive }) => (
              <>
              <div className="flex items-center justify-center gap-2">
              <PiJoystickFill size={22} color={isActive ? "white" : "#a1a1aa"}/>
              <span className={`flex-1 ml-1 truncate text-small font-medium ${isActive ? "white" : "text-default-500"} group-data-[selected=true]:text-foreground`} data-slot="heading">Printing Report</span>
              </div>
              <FaAngleRight size={13} color={isActive ? "white" : "#a1a1aa"}/>
              </>
              )}
            </NavLink>
              </li>
              <li>
              <NavLink
              to="/sewingReport"
              className={({ isActive }) =>
                `flex group gap-2 items-center justify-between relative py-1.5 w-full cursor-pointer outline-none px-3 min-h-11 rounded-large h-[44px] hover:bg-default-50 duration-300 ease-in-out ${
                  isActive ? 'bg-default-50 text-white' : 'bg-transparent text-white'
                }`}>
              {({ isActive }) => (
              <>
              <div className="flex items-center justify-center gap-2">
              <GiSewingMachine size={22} color={isActive ? "white" : "#a1a1aa"}/>
              <span className={`flex-1 ml-1 truncate text-small font-medium ${isActive ? "white" : "text-default-500"} group-data-[selected=true]:text-foreground`} data-slot="heading">Sewing Report</span>
              </div>
              <FaAngleRight size={13} color={isActive ? "white" : "#a1a1aa"}/>
              </>
              )}
            </NavLink>
              </li>
              <li>
              <NavLink
              to="/cuttingReport"
              className={({ isActive }) =>
                `flex group gap-2 items-center justify-between relative py-1.5 w-full cursor-pointer outline-none px-3 min-h-11 rounded-large h-[44px] hover:bg-default-50 duration-300 ease-in-out ${
                  isActive ? 'bg-default-50 text-white' : 'bg-transparent text-white'
                }`}>
              {({ isActive }) => (
              <>
              <div className="flex items-center justify-center gap-2">
              <IoIosCut size={22} color={isActive ? "white" : "#a1a1aa"}/>
              <span className={`flex-1 ml-1 truncate text-small font-medium ${isActive ? "white" : "text-default-500"} group-data-[selected=true]:text-foreground`} data-slot="heading">Cutting Report</span>
              </div>
              <FaAngleRight size={13} color={isActive ? "white" : "#a1a1aa"}/>
              </>
              )}
            </NavLink>
              </li>
              <li>
              <NavLink
              to="/finishingReport"
              className={({ isActive }) =>
                `flex group gap-2 items-center justify-between relative py-1.5 w-full cursor-pointer outline-none px-3 min-h-11 rounded-large h-[44px] hover:bg-default-50 duration-300 ease-in-out ${
                  isActive ? 'bg-default-50 text-white' : 'bg-transparent text-white'
                }`}>
              {({ isActive }) => (
              <>
              <div className="flex items-center justify-center gap-2">
              <FaTasks size={22} color={isActive ? "white" : "#a1a1aa"}/>
              <span className={`flex-1 ml-1 truncate text-small font-medium ${isActive ? "white" : "text-default-500"} group-data-[selected=true]:text-foreground`} data-slot="heading">Finishing Report</span>
              </div>
              <FaAngleRight size={13} color={isActive ? "white" : "#a1a1aa"}/>
              </>
              )}
            </NavLink>
              </li>
            </ul>
          </li>
          </nav>
        </div>
      </div>
      <span aria-hidden="true" className="w-px h-px block ml-1 mt-8"></span>
      <div className="mt-auto flex flex-col">
      <Button color="danger" startContent={<FaArrowRightFromBracket />}>
        Sign Out
      </Button> 
      </div>
      </div>
      <div className="w-full flex-1 flex-col p-4">
        <Outlet></Outlet>
      </div>
    </div>
  )
}



export default Main
