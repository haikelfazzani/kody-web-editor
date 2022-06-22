import { lazy } from "react";

const Playground = lazy(() => import("./pages/Playground"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Callback = lazy(() => import("./pages/Callback"));
const Account = lazy(() => import("./pages/Account"));

const routes = [
  { path: "/", component: Playground },

  { path: "/login", component: Login },
  { path: "/callback", component: Callback },
  { path: "/account", component: Account },

  { path: "/about", component: About }
];

export default routes