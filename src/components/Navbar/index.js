import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { faCommentDots, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { imgErrorHandler } from "../../imgErrorHandler";
import "./style.css";

const NavbarProfile = () => {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);

  var image = "https://minimint.s3.us-east-1.amazonaws.com/" + user.userId;

  function pfpCheck() {
      if (user.userId == 0) {
          return (
            <img
            src={process.env.PUBLIC_URL + "/img/profile.jpg"}
            width="20"
            height="20"
            alt="X"
          />
          )
      } else {
          return (
            <img
            src={image}
            width="20"
            height="20"
            alt="X"
            onError={imgErrorHandler}
          />
          )
      }
  }

  function nameCheck() {
      if (profile.alias == "") {
          return (
              "Login"
          )
      } else {
          return (
            profile.alias
          )
      }
  }

  return (
    <Navbar expand="lg" variant="light" className="border-bottom">
      <Container>
        <Navbar.Brand to="/FeedPage" as={Link}>
          {" "}
          <img
            src={process.env.PUBLIC_URL + "/img/MiniMintLogo2.png"}
            width="40"
            height="40"
            alt="logo"
          />{" "}
          MiniMint
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex align-items-center justify-content-center ms-auto">
            <Nav.Link href="#">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </Nav.Link>
            <Nav.Link to="/CreatePostPage" as={Link}>
              <FontAwesomeIcon icon={faCommentDots} size="lg" />
            </Nav.Link>
            <NavDropdown
              title={
                <div className="profile-header">
                  {pfpCheck()}
                  <p>{nameCheck()} &#9660;</p>
                </div>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item to="/ProfilePage" as={Link}>
                Your Profile
              </NavDropdown.Item>
              <NavDropdown.Item to="/PrivacyPage" as={Link}>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="/">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarProfile;
