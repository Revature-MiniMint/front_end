import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flagStatus } from "../../profileSlice";
import { useNavigate } from "react-router";

const UserCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const profile = {
    ...info,
    ...user,
  };

  useEffect(() => {
   
    console.log(profile)
    if (profile.userId !== 0) {

    }

    else {
      navigate("/");
      dispatch(flagStatus("Please login before proceeding"));
    }

  }, []);



  return (
    <>
    </>
  );
};
export default UserCheck;
