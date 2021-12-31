import './App.css';
// import Register from './components/Register';
import LoginForm from './components/LoginForm';
import Profile from './pages/ProfilePage';
import UpdatePage from './pages/UpdatePage';
import UpdatePicture from './components/UpdatePicture';

function App() {
  return (
    <div>
      {/* <LoginForm/> */}
      {/* <Profile /> */}
      {/* <Register /> */}
      <UpdatePage />
      <UpdatePicture />
    </div>
  );
}

export default App;
