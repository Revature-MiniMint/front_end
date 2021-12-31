import './App.css';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import FeedPage from './pages/FeedPage';


function App() {
  return (
    <div className="container">
      <PostPage />
      <CreatePostPage />
      <FeedPage />
    </div>
  );
}

export default App;

