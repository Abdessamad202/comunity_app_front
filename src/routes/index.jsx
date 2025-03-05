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
// import Home from "../pages/Home";
import ForgetPasswordLayout from "../layouts/ForgetPasswordLayout";
import ForgotPasswordForm from "../components/ForgetPasswordForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ForgetPasswordGuard from "../middlewares/ForgetPasswordGuard";
import Landing from "../pages/Landing";
import Posts from "../components/Posts";
import ModalWithImage from "../components/Modal";
import PageHome from "../pages/Home";
import ProfilePage from "../pages/Profile";
import Layout from "../layouts/Layout";
import ScrollToTop from "../components/ScrollToTop";
// import DeleteComment from "../components/DeleteComment";

const AppRoutes = () => {
  return (
    <>

      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route element={<ToastContainer />} />
        <Route path="/posts" element={<Posts />} />
        {/* <Route path="/delete" element={<DeleteComment />} /> */}
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
          <Route element={<Layout />}>
            <Route path="home" element={<PageHome />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
        {/* Step-based authentication (user must complete steps in order) */}
        {/* Step-based authentication (user must complete steps in order) */}
        <Route element={<RegisterLayout />}>
          <Route element={<StepsGuard />}>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verify" element={<VerificationForm />} />
            <Route path="/profile-completion" element={<ProfileCompletionForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
