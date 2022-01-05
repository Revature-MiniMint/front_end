import React from 'react';
import Footer from '../../components/Footer';
import SettingsMenu from '../../components/SettingsMenu';
import UpdateForm from '../../components/UpdateForm';
import NavbarProfile from "../../components/Navbar";

const UpdatePage = () => {
    return (
        <>
            <NavbarProfile />
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <SettingsMenu />
                    </div>
                    <div className="col-6">
                        <UpdateForm />
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
            <Footer />

        </>
    );
}

export default UpdatePage;