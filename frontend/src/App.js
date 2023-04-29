import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import { HomePage } from "./pages/Home";
import { RegisterPage } from "./pages/Register";
import ProfilePage from './pages/Profile';
import { PageNotFound } from "./pages/PageNotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}