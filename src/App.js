import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/PrivateRoute";
import Spinner from "./components/Spinner";

const Playground = lazy(() => import("./pages/Playground"));
const Profile = lazy(() => import("./pages/Profile"));
const About = lazy(() => import("./pages/About"));

const routes = [
  { path: "/", comp: <Home /> },
  { path: "/playground", comp: <Playground /> },
  { path: "/playground/:service/:id", comp: <Playground /> },
  { path: "/profile", comp: <Profile /> },
  { path: "/about", comp: <About /> },
  { path: "/auth", comp: <Auth /> }
];

export default function App () {

  return <BrowserRouter>
    <Switch>
      {routes.map((route, i) => {
        if (route.path === '/' || route.path === '/auth') {
          return <Route key={'route' + i} exact path={route.path} render={() => route.comp} />
        }
        if (route.path === '/profile') {
          return <Route
            key={'route' + i}
            path={route.path}
            render={() => <Suspense fallback={<Spinner />}>
              <PrivateRoute>{route.comp}</PrivateRoute>
            </Suspense>}
          />
        }
        else {
          return <Route
            key={'route' + i}
            path={route.path}
            render={() => <Suspense fallback={<Spinner />}>{route.comp}</Suspense>}
          />
        }
      })}
    </Switch>
  </BrowserRouter>;
} 