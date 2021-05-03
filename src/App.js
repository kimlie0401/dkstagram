import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import Loader from "./components/loader";

const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <Loader />
          </div>
        }
      >
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.REGISTER} component={Register} />
          <Route path={ROUTES.DASHBOARD} component={Home} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
