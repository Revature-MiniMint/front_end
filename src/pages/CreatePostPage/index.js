import CreatePost from "../../components/CreatePost";
import Footer from "../../components/Footer";
import NavbarProfile from "../../components/Navbar";

const CreatePostPage = () => {
    return (
        <div>
            <NavbarProfile />
            <CreatePost />
            <Footer />
        </div>
    );
}

export default CreatePostPage;