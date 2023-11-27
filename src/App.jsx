import history from "./history";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./views/pages/layout/Layout";
import SignInPage from "./views/pages/SignInPage";
import ReactComponentLoader from "./views/pages/ReactComponentLoader";
import AuthGuard from "./auth/AuthGuard";
import WebContext from "./views/context/WebContext";
import { useContext, useEffect, useState } from "react";

const InititialRoutes = [
  {
    path: "login",
    page: SignInPage,
    disableLayout: true
  },
  {
    sideBar: true,
    title: "Dashboards",
    icon: "DashboardTwoTone",
    path: "dashboards",
    page: "DashboardsPage.jsx"
  },
  {
    sideBar: true,
    title: "Test Initiation",
    icon: "GppGoodTwoTone",
    path: "assessment",
    page: "SecurityAuditManagement.jsx"
  },
  {
    sideBar: true,
    title: "Scan Reports",
    icon: "SummarizeTwoTone",
    path: "scan-reports",
    page: "ScanReportsPage.jsx"
  }
];

export default function App(props) {
  const { product } = props;
  const context = useContext(WebContext);
  const [routes, setRoutes] = useState(InititialRoutes);

  useEffect(() => {
    setRoutes(InititialRoutes);
  }, []);

  return (
    <Router basename="/" history={history}>
      <AuthGuard product={product} routes={routes}>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={`/${product?.page.base}/${route.path}`}
              element={
                route.page !== undefined ? (
                  <Layout
                    disableLayout={route.disableLayout}
                    base={"/" + product?.page.base}
                    sideBarItems={routes.filter((r) => r.sideBar === true || r.divider === true)}
                    {...props}
                    {...context}
                  >
                    {typeof route.page === "string" ? (
                      <ReactComponentLoader key={`page-${index}`} page={route.page} {...props} {...context} extras={route.extras} />
                    ) : (
                      <route.page key={`page-${index}`} {...props} {...context} />
                    )}
                  </Layout>
                ) : null
              }
            />
          ))}
          <Route exact path="/" element={<Navigate to={`/${product?.page.base}/login`} />} />
        </Routes>
      </AuthGuard>
    </Router>
  );
}
