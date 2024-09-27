import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/Signin.jsx";
import { Signup } from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { SendMoney } from "./pages/SendMoney.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<Navigate to={"/signin"} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
