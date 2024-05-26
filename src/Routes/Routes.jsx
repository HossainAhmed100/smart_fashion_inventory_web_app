import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EmbroideryReport from "../Pages/EmbroideryReport/EmbroideryReport";
import FinishingReport from "../Pages/FinishingReport/FinishingReport";
import SewingReport from "../Pages/SewingReport/SewingReport";
import CuttingReport from "../Pages/CuttingReport/CuttingReport";
import PrintingReport from "../Pages/PrintingReport/PrintingReport";
import PriviteRoutes from "./PriviteRoutes";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import InsertNewData from "../Pages/InsertNewData/InsertNewData";
import EditProject from "../Pages/EditProject/EditProject";
import TagList from "../Pages/TagList/TagList";
import ExpenseTracker from "../Pages/ExpenseTracker/ExpenseTracker";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PriviteRoutes><Main /></PriviteRoutes>,
        children: [
            {
                path: "/",
                element: <Dashboard />
            },
            {
                path: "/embroideryReport",
                element: <EmbroideryReport />
            },
            {
                path: "/printingReport",
                element: <PrintingReport />
            },
            {
                path: "/cuttingReport",
                element: <CuttingReport />
            },
            {
                path: "/sewingReport",
                element: <SewingReport />
            },
            {
                path: "/finishingReport",
                element: <FinishingReport />
            },
            {
                path: "/insertNewData",
                element: <InsertNewData />
            },
            {
                path: "/editProject",
                element: <EditProject />
            },
            {
                path: "/tagList",
                element: <TagList />
            },
            {
                path: "/expenseTracker",
                element: <ExpenseTracker />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
])