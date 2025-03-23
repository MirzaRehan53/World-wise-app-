import { lazy, Suspense } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthenticationContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Product from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const App = () => {
  // console.log(cities);

  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <Suspense fallback={<SpinnerFullPage />}>
            <BrowserRouter>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path={"pricing"} element={<Pricing />} />
                <Route path={"product"} element={<Product />} />
                <Route
                  path={"app"}
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to={"cities"} replace />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path={"login"} element={<Login />} />

                <Route path={"*"} element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
};
export default App;
