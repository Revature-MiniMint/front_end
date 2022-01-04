import React from "react";

const SettingsMenu = () => {
    return (
        <div className="container">
            <br />
            <div className ="card settings-menu">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><a href="/ProfilePicPage">Profile Picture</a></li>
                    <li className="list-group-item"><a href="/UpdatePage">Profile Information</a></li>
                    <li className="list-group-item"><a href="/PrivacyPage">Privacy</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SettingsMenu;