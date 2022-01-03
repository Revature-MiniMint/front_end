import React from 'react';
import Footer from '../../components/Footer';
import SettingsMenu from '../../components/SettingsMenu';
import UpdatePicture from '../../components/UpdatePicture';

const ProfilePicPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-3">
                    <SettingsMenu />
                </div>
                <div className="col-6">
                    <UpdatePicture />
                </div>
                <div className='col-2'></div>
            </div>
            <Footer />
        </>
    );
}

export default ProfilePicPage;