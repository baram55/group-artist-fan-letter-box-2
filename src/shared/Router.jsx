import Detail from "pages/Detail";
import Home from "pages/Home";
import { LogIn } from "pages/LogIn";
import { Profile } from "pages/Profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Router() {
  return (
    <BrowserRouter>
      <ToastContainer
        toastStyle={{
          backgroundColor: "#ffffff",
          color: "black",
          margin: "0",
          padding: "0",
          textAlign: "center",
        }}
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
        theme="light"
        limit={1}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
