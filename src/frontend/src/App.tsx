import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import BusinessCard from "./pages/BusinessCard";
import Portfolio from "./pages/Portfolio";
import SmartLinks from "./pages/SmartLinks";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: BusinessCard,
});

const linksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/links",
  component: SmartLinks,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: Portfolio,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  linksRoute,
  portfolioRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
