import React from "react";
import { Link } from "react-router-dom";

const SettingsMenu = () => {
    return (
        <div>
            <br />
            <div className ="card settings-menu">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><Link to="/ProfilePicPage" as={Link}>Profile Picture</Link></li>
                    <li className="list-group-item"><Link to="/UpdatePage" as={Link}>Profile Information</Link></li>
                    <li className="list-group-item"><Link to="/PrivacyPage" as={Link}>Privacy</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default SettingsMenu;