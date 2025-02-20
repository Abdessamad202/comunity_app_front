import { Route, Routes } from "react-router";
import ProfileCompletionForm from "../components/ProfileCompletionForm";
import VerificationForm from "../components/VerificationForm";
import RegisterForm from "../components/RegisterForm";
import StepsGuard from "../middlewares/StepsGuard";
import RegisterLayout from "../layouts/RegisterLayout";
import ProtectedRoute from "../middlewares/ProtectedRoute";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import { ToastContainer } from "react-toastify";
import Home from "../pages/Home";
import ForgetPasswordLayout from "../layouts/ForgetPasswordLayout";
import ForgotPasswordForm from "../components/ForgetPasswordForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ForgetPasswordGuard from "../middlewares/ForgetPasswordGuard";
import Landing from "../pages/Landing";
import Posts from "../components/Posts";

const AppRoutes = () => {
  return (
    <>

      <Routes>
        {/* Public routes */}
        <Route element={<ToastContainer />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route element={<ForgetPasswordLayout />}>
          <Route element={<ForgetPasswordGuard />}>
            <Route path="/verify-email" element={<ForgotPasswordForm />} />
            <Route path="/verify-code" element={<VerificationForm />} />
            <Route path="/change-password" element={<ChangePasswordForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
        {/* Protected routes for authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        {/* Step-based authentication (user must complete steps in order) */}
        {/* Step-based authentication (user must complete steps in order) */}
        <Route element={<RegisterLayout />}>
          <Route element={<StepsGuard />}>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify" element={<VerificationForm />} />
            <Route path="/profile" element={<ProfileCompletionForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
