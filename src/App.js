import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PrivacyPage from "./pages/PrivacyPage";
import SettingsMenu from "./components/SettingsMenu";
import CreatePostPage from "./pages/CreatePostPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import UpdatePage from "./pages/UpdatePage";
import UpdatePicture from "./components/UpdatePicture";
import LoginPage from "./pages/LoginPage";
import NavbarProfile from "./components/Navbar";

function App() {
  return (
    <div>
      <NavbarProfile />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/PostPage" element={<PostPage />} />
          <Route path="/CreatePostPage" element={<CreatePostPage />} />
          <Route path="/FeedPage" element={<FeedPage />} />
          <Route path="/PrivacyPage" element={<PrivacyPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/UpdatePage" element={<UpdatePage />} />
          <Route path="/UpdatePicture" element={<UpdatePicture />} />
        </Routes>
      </Router>
      {/* <SettingsMenu /> */}
    </div>
  );
}

export default App;
