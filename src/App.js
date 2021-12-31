import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PostPage from './pages/PostPage';
import PrivacyPage from './pages/PrivacyPage';
import SettingsMenu from './components/SettingsMenu';
import CreatePostPage from './pages/CreatePostPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import UpdatePage from './pages/UpdatePage';
import UpdatePicture from './components/UpdatePicture';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="container">
      {/* <PostPage />
      <CreatePostPage />
      <FeedPage /> */}
      <div>
        <Router>
          <div>
              <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/PrivacyPage' element={<PrivacyPage />} />
                <Route path='/ProfilePage' element={<ProfilePage />} />
                <Route path='/UpdatePage' element={<UpdatePage />} />
                <Route path='/UpdatePicture' element={<UpdatePicture />} />
              </Routes>
          </div>
        </Router>
        {/* <SettingsMenu /> */}
      </div>
    </div>
  );
}

export default App;

