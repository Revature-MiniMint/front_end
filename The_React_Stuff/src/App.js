import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PrivacyPage from './pages/PrivacyPage';
import Profile from './pages/ProfilePage';
import UpdatePage from './pages/UpdatePage';
import UpdatePicture from './components/UpdatePicture';
import SettingsMenu from './components/SettingsMenu';
import NavbarProfile from './components/Navbar';

function App() {
  return (
      <div>
        <NavbarProfile />
        <Router>
          <div>
              <Routes>
                <Route path='/PrivacyPage' element={<PrivacyPage />} />
                <Route path='/ProfilePage' element={<Profile />} />
                <Route path='/UpdatePage' element={<UpdatePage />} />
                <Route path='/UpdatePicture' element={<UpdatePicture />} />
              </Routes>
          </div>
        </Router>
        {/* <SettingsMenu /> */}
      </div>
  );
}

export default App;