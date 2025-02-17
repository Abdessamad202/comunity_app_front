import { Route, Routes } from "react-router";
import ProfileCompletionForm from "../components/ProfileCompletionForm";
import VerificationForm from "../components/VerificationForm";
import RegisterForm from "../components/RegisterForm";
import { StepsGuard } from "../middlewares/StepsGuard";
import RegisterLayout from "../layouts/RegisterLayout";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <>

      <Routes>
        {/* Public routes */}
        <Route element={<ToastContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected routes for authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        {/* Step-based authentication (user must complete steps in order) */}
        <Route path="/" element={<RegisterLayout />}>
        <Route element={<StepsGuard />}>
          <Route path="register" element={<RegisterForm />} />
          <Route path="verify" element={<VerificationForm />} />
          <Route path="profile" element={<ProfileCompletionForm />} />
        </Route>
      </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
