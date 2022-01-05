import React from "react";
import NavbarProfile from "../../components/Navbar";
import PrivacyForm from "../../components/PrivacyForm";
import Footer from "../../components/Footer";
import SettingsMenu from "../../components/SettingsMenu";
import UserCheck from "../../components/checkUser/userCheck";

const PrivacyPage = () => {
    return (
        <>
        <NavbarProfile />
        <UserCheck/>
        <div className="container">
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <SettingsMenu />
                </div>
                <div className="col-6">
                    <PrivacyForm />
                </div>
                <div className="col-2"></div>
            </div>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPage;