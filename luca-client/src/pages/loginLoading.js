import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const LoadingPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginLoading = () => {
  const Social = useSelector((state) => state.user.userInfo.isSocial);
  const navigate = useNavigate();

  if (!Social) {
    setTimeout(() => {
      navigate("main");
    }, 2000);
    return (
      <LoadingPage>
        <img src="loading_cards.gif" alt="loading" />
      </LoadingPage>
    );
  } else {
    setTimeout(() => {
      navigate("main");
    });
    return null;
  }
};

export default LoginLoading;
