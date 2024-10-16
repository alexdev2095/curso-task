import { createBrowserRouter } from "react-router-dom";
// import Layout from "@/layout/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element:
            children: [
                {
                    index: true,
                    element: <DashboardContainer />,
                },
                
      ],
    },
]);

export default router;
