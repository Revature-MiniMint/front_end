import UserCheck from "../../components/checkUser/userCheck";
import CreatePost from "../../components/CreatePost";
import Footer from "../../components/Footer";
import NavbarProfile from "../../components/Navbar";



const CreatePostPage = () => {
    
    return (
        <div>
            <NavbarProfile />
            <UserCheck/>
            <CreatePost />
            <Footer />
        </div>
    );
}

export default CreatePostPage;