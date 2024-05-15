import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EmbroideryReport from "../Pages/EmbroideryReport/EmbroideryReport";
import FinishingReport from "../Pages/FinishingReport/FinishingReport";
import SewingReport from "../Pages/SewingReport/SewingReport";
import CuttingReport from "../Pages/CuttingReport/CuttingReport";
import PrintingReport from "../Pages/PrintingReport/PrintingReport";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
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
        ]
    }
])