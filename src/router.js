import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loading from "./components/loading";

const NotFound = React.lazy(() => import("./components/notFound"));
const homePage = React.lazy(() => import("./view/homePage"));

const RouterApp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <div className="child">
          <Switch>
            <Route exact path="/" component={homePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
};

export default RouterApp;
