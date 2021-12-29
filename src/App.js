import './App.css';
// import LoginForm from './components/LoginForm';
import Profile from './pages/profile';
import PrivacyPage from './pages/PrivacyPage';
import NavbarProfile from './components/NavbarProfile';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      {/* <LoginForm/> */}
      <NavbarProfile />
      <Profile />
      <Footer />
      {/* <PrivacyPage /> */}
    </div>
  );
}

export default App;
