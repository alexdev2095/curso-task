import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import { DashboardContainer } from "./lazy-imports";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <DashboardContainer />,
            },

        ],
    },
]);

export default router;
