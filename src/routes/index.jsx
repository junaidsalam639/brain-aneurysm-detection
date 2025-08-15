import React, { Suspense } from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./protected-route";
const HomePage = React.lazy(() => import("../pages/home/HomePage"));
const ContactPage = React.lazy(() => import("../pages/contact/ContactPage"));
const LoginPage = React.lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = React.lazy(() => import("../pages/auth/SingnupPage"));
const PatientsPage = React.lazy(() => import("../pages/patients/PatientsPage"));
const ProfilePage = React.lazy(() => import("../pages/auth/ProfilePage"));
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));

const AppRoutes = () => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                <Route
                    path="/patients"
                    element={
                        <ProtectedRoute>
                            <PatientsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
