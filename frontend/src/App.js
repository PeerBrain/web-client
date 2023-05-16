import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import { HomePage } from "./pages/Home";
import { RegisterPage } from "./pages/Register";
import ProfilePage from './pages/Profile';
import { PageNotFound } from "./pages/PageNotFound";
import LoggedOut from "./pages/Logout";
import GenerateKeypair from "./pages/Generate-keys";
import KeySettings from "./pages/keys-settings";
import { KeysUpdated } from "./pages/KeysUpdated";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/logout" element={<LoggedOut />} />
      <Route path="/keys" element={<GenerateKeypair />} />
      <Route path="/settings/keys" element={<KeySettings />} />
      <Route path="/settings/keys/updated" element={<KeysUpdated />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  );
}