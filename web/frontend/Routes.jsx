import { Routes as ReactRouterRoutes, Route } from "react-router-dom";
import PlanPage from "./components/screens/PlanPage";
import EligibleCheck from "./components/layout/EligibleCheck";
import { useState } from "react";
import NotEligibleCard from "./components/layout/NotEligibleCard";
import SelectLanguage from "./components/screens/SelectLanguage";
import CustomerView from "./components/screens/CustomerView";
import Settings from "./components/screens/Settings";
import WelcomPage from "./components/screens/WelcomPage";

/**
 * File-based routing.
 * @desc File-based routing that uses React Router under the hood.
 * To create a new route create a new .jsx file in `/pages` with a default export.
 *
 * Some examples:
 * * `/pages/index.jsx` matches `/`
 * * `/pages/blog/[id].jsx` matches `/blog/123`
 * * `/pages/[...catchAll].jsx` matches any URL not explicitly matched
 *
 * @param {object} pages value of import.meta.globEager(). See https://vitejs.dev/guide/features.html#glob-import
 *
 * @return {Routes} `<Routes/>` from React Router, with a `<Route/>` for each file in `pages`
 */
export default function Routes({ pages }) {

  const [isEligible, setEligible] = useState(true);
  const [checkEligibleLoading, setCheckLoading] = useState(true);
  const [lang, setlang] = useState(null);
  const [tutorial, setTutorial] = useState(null);
  const [loading, setloading] = useState(true);

  const routes = useRoutes(pages);
  const routeComponents = routes.map(({ path, component: Component }) => (
    <Route
      key={path}
      path={path}
      element={
        isEligible ?
          !lang ?
            <SelectLanguage
              setlang={setlang} />
            :
            <Component
              tutorial={tutorial}
              setTutorial={setTutorial}
              loading={loading} />
          :
          <NotEligibleCard />
      } />

  ));
  console.log(isEligible, "---isisEligible")

  const OtherRoute = [
    { path: "/plan", element: <PlanPage /> },
    { path: "/customer", element: tutorial === null || tutorial === 0 ? <WelcomPage setTutorial={setTutorial} /> : <CustomerView /> },
    { path: "/setting", element: tutorial === null || tutorial === 0 ? <WelcomPage setTutorial={setTutorial} /> : <Settings /> },


  ];

  const ProtectedRoute = OtherRoute.map(({ path, element }, index) => {
    return <Route path={path} element={isEligible ? !lang ? <SelectLanguage setlang={setlang} /> : element : <NotEligibleCard />} key={index} />
  })



  const NotFound = routes.find(({ path }) => path === "/notFound").component;



  return (
    <ReactRouterRoutes>
      <Route path="/" element={
        <EligibleCheck
          isEligible={isEligible}
          setEligible={setEligible}
          checkEligibleLoading={checkEligibleLoading}
          setCheckLoading={setCheckLoading}
          setlanguage={setlang}
          language={lang}
          setTutorial={setTutorial}
          tutorial={tutorial}
          loading={loading}
          setloading={setloading}
        />
      }>
        {routeComponents}
        {ProtectedRoute}
      </Route>
      <Route path="*" element={<NotFound />} />
    </ReactRouterRoutes>
  );
}

function useRoutes(pages) {
  const routes = Object.keys(pages)
    .map((key) => {
      let path = key
        .replace("./pages", "")
        .replace(/\.(t|j)sx?$/, "")
        /**
         * Replace /index with /
         */
        .replace(/\/index$/i, "/")
        /**
         * Only lowercase the first letter. This allows the developer to use camelCase
         * dynamic paths while ensuring their standard routes are normalized to lowercase.
         */
        .replace(/\b[A-Z]/, (firstLetter) => firstLetter.toLowerCase())
        /**
         * Convert /[handle].jsx and /[...handle].jsx to /:handle.jsx for react-router-dom
         */
        .replace(/\[(?:[.]{3})?(\w+?)\]/g, (_match, param) => `:${param}`);

      if (path.endsWith("/") && path !== "/") {
        path = path.substring(0, path.length - 1);
      }

      if (!pages[key].default) {
        console.warn(`${key} doesn't export a default React component`);
      }

      return {
        path,
        component: pages[key].default,
      };
    })
    .filter((route) => route.component);

  return routes;
}
