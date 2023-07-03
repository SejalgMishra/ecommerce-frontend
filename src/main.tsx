import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import MainPage from "./pages/MainPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import CheckOut from "./pages/CheckOut.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";
import SingleProduct from "./components/SingleProduct.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/productpage" element={<ProductPage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/product" element={<SingleProduct />} />
        <Route path="/checkout" element={<CheckOut />} />
        {/* <Route path="/myorder" element={<Myorder />} />
        <Route path="/orderSummery/:id" ex element={<OrderSummery />} />  */}
      </Route>
      <Route path="/fpassword" element={<ForgetPassword />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        {/* <React.StrictMode> */}
        <RouterProvider router={router} />
      </QueryClientProvider>
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>
);
