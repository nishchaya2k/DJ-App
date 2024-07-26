import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./App.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LogInOut/Login.tsx";
import Register from "./pages/LogInOut/Register.tsx";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
let persistor = persistStore(store);
import Profile from "./pages/Profile/Profile.tsx";
import SignOut from "./pages/SignOut/SignOut.tsx";
import QR from "./pages/QR/QR.tsx";
import GST from "./pages/GST/GST.tsx";
import Request from "./pages/Request/Request.tsx";
import Money from "./pages/Money/Money.tsx";
import PublishPlaylist from "./pages/PublishPlaylist/PublishPlaylist.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/artist/register",
    element: <Register />,
  },
  {
    path: "/artist/login",
    element: <Login />,
  },
  {
    path: "/artist/gst",
    element: <GST />,
  },
  {
    path: "/artist/request",
    element: <Request />,
  },
  {
    path: "/artist/money",
    element: <Money />,
  },
  {
    path: "/artist/publishPlaylist",
    element: <PublishPlaylist />,
  },
  {
    path: "/artist/qr",
    element: <QR />,
  },
  {
    path: "/artist/profile",
    element: <Profile />,
  },
  {
    path: "/artist/signout",
    element: <SignOut />,
  },
  {
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <PersistGate loading={null} persistor={persistor} />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
