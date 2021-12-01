import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/404";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";

function LoggedOutRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LoggedOutRouter;
