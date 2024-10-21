import { lazy } from "react";

const DashboardContainer = lazy(
    () => import("@/sections/dashboard/container/DashboradContainer")
);

export { DashboardContainer };
